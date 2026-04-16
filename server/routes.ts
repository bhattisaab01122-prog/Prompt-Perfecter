import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function callGemini(systemInstruction: string, userMessage: string): Promise<string> {
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
          parts: [{ text: `${systemInstruction}\n\n${userMessage}` }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
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

      const optimizeInstruction = `You are an expert prompt engineer. Rewrite and optimize the user's prompt based on these settings:
- Tone: ${tone}
- Purpose: ${purpose}
- Output Depth: ${depth}

Make the prompt clear, well-structured, and high-performing. Return ONLY the optimized prompt text, nothing else.`;

      const optimizedPrompt = await callGemini(optimizeInstruction, prompt);

      const scoreInstruction = `You are a prompt quality evaluator. Score the following optimized prompt on a scale of 0-100 based on:
- Clarity (how clear and unambiguous it is)
- Structure (how well-organized it is)
- Specificity (how detailed and specific the instructions are)

Return ONLY a single integer number between 0 and 100. Nothing else.`;

      const scoreText = await callGemini(scoreInstruction, optimizedPrompt);
      const promptScore = Math.min(100, Math.max(0, parseInt(scoreText, 10) || 75));

      const saved = await storage.createOptimization({
        originalPrompt: prompt,
        optimizedPrompt,
      });

      res.json({ optimizedPrompt: saved.optimizedPrompt, promptScore });
    } catch (error: any) {
      console.error("[optimize] Gemini error:", error?.message || error);
      const msg: string = error?.message || "";
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
