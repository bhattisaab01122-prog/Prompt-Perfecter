import type { Express } from "express";
import type { Server } from "http";
import OpenAI from "openai";
import { storage } from "./storage";
import { api } from "@shared/routes";

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set");
  return new OpenAI({ apiKey, baseURL: "https://api.groq.com/openai/v1" });
}

async function callGroq(userPrompt: string): Promise<string> {
  const client = getGroqClient();
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: userPrompt }],
    temperature: 0.7,
  });
  return response.choices[0]?.message?.content?.trim() ?? "";
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.optimize.generate.path, async (req, res) => {
    try {
      const { prompt, tone, purpose, depth } = api.optimize.generate.input.parse(req.body);

      const combinedPrompt = `You are an expert prompt engineer and quality evaluator.

Task: Rewrite and optimize the following prompt, then score it.

Settings:
- Tone: ${tone}
- Purpose: ${purpose}
- Output Depth: ${depth}

Original prompt:
${prompt}

Respond with ONLY valid JSON in this exact format (no markdown, no code block, no extra text):
{"optimizedPrompt":"<the rewritten prompt>","score":<integer 0-100>}

The score should reflect clarity, structure, and specificity of the optimized prompt.`;

      const raw = await callGroq(combinedPrompt);

      // Strip markdown code fences if the model wraps the JSON
      const cleaned = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();

      let optimizedPrompt: string;
      let promptScore: number;

      try {
        const parsed = JSON.parse(cleaned);
        optimizedPrompt = String(parsed.optimizedPrompt || "").trim();
        promptScore = Math.min(100, Math.max(0, parseInt(parsed.score, 10) || 75));
        if (!optimizedPrompt) throw new Error("Empty optimizedPrompt in response");
      } catch (parseErr) {
        console.warn("[optimize] JSON parse failed, using raw response as prompt:", parseErr);
        optimizedPrompt = cleaned;
        promptScore = 75;
      }

      const saved = await storage.createOptimization({
        originalPrompt: prompt,
        optimizedPrompt,
      });

      res.json({ optimizedPrompt: saved.optimizedPrompt, promptScore });
    } catch (error: any) {
      const msg: string = error?.message || "";
      console.error("[optimize] Error:", msg);

      const message = msg.includes("GROQ_API_KEY")
        ? "Groq API key is not configured. Please set the GROQ_API_KEY secret."
        : msg.includes("429")
        ? "Too many requests — please wait a moment and try again."
        : msg.includes("401") || msg.includes("403")
        ? "Invalid Groq API key. Please check your GROQ_API_KEY secret."
        : "Optimization failed. Please try again.";

      res.status(500).json({ message });
    }
  });

  app.get(api.optimize.history.path, async (req, res) => {
    try {
      const history = await storage.getOptimizations();
      res.json(history);
    } catch (error) {
      res.json([]);
    }
  });

  try {
    const existing = await storage.getOptimizations();
    if (existing.length === 0) {
      await storage.createOptimization({
        originalPrompt: "Write a blog post about AI.",
        optimizedPrompt: "Write a comprehensive and engaging blog post about the current state of Artificial Intelligence, focusing on its impact on creative industries. Include real-world examples, potential future developments, and address common ethical concerns. The tone should be informative yet accessible to a general audience.",
      });
    }
  } catch (err: any) {
    console.error("[startup] DB seed skipped — cannot reach database:", err.message);
  }

  return httpServer;
}
