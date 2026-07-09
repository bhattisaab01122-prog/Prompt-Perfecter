import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const response = await fetch(`${GEMINI_BASE_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();

    // Log full error details including ALL headers and body
    {
      console.error(`[Gemini ${response.status}] Full error dump`);

      // Dump every response header
      const allHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => { allHeaders[key] = value; });
      console.error(`[Gemini ${response.status}] All response headers:`, JSON.stringify(allHeaders, null, 2));

      // Full raw body
      console.error(`[Gemini ${response.status}] Raw response body:`, body);

      // Parse structured details from body
      try {
        const parsed = JSON.parse(body);
        const details = parsed?.error?.details;
        const message = parsed?.error?.message;
        if (message) console.error(`[Gemini ${response.status}] Error message:`, message);
        if (details) console.error(`[Gemini ${response.status}] Error details:`, JSON.stringify(details, null, 2));
      } catch {}
    }

    throw new Error(`Gemini API error ${response.status}: ${body}`);
  }

  const data = await response.json() as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return text.trim();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.optimize.generate.path, async (req, res) => {
    try {
      const { prompt, tone, purpose, depth } = api.optimize.generate.input.parse(req.body);

      // Single Gemini call: optimize + score together to halve API usage
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

      const raw = await callGemini(combinedPrompt);

      // Strip markdown code fences if Gemini wraps the JSON
      const cleaned = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();

      let optimizedPrompt: string;
      let promptScore: number;

      try {
        const parsed = JSON.parse(cleaned);
        optimizedPrompt = String(parsed.optimizedPrompt || "").trim();
        promptScore = Math.min(100, Math.max(0, parseInt(parsed.score, 10) || 75));
        if (!optimizedPrompt) throw new Error("Empty optimizedPrompt in response");
      } catch (parseErr) {
        // Fallback: treat the whole response as the optimized prompt with a default score
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

      const message = msg.includes("GEMINI_API_KEY")
        ? "Gemini API key is not configured. Please set the GEMINI_API_KEY secret."
        : msg.includes("429")
        ? "Too many requests — please wait a moment and try again."
        : msg.includes("401") || msg.includes("403")
        ? "Invalid Gemini API key. Please check your GEMINI_API_KEY secret."
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

  const existing = await storage.getOptimizations();
  if (existing.length === 0) {
    await storage.createOptimization({
      originalPrompt: "Write a blog post about AI.",
      optimizedPrompt: "Write a comprehensive and engaging blog post about the current state of Artificial Intelligence, focusing on its impact on creative industries. Include real-world examples, potential future developments, and address common ethical concerns. The tone should be informative yet accessible to a general audience.",
    });
  }

  return httpServer;
}
