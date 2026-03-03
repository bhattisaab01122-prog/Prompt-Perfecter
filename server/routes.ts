import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const openai = new OpenAI({ 
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });

  app.post(api.optimize.generate.path, async (req, res) => {
    try {
      const { prompt, tone, purpose, depth } = api.optimize.generate.input.parse(req.body);

      const systemPrompt = `You are an expert prompt engineer. Rewrite and optimize the user's prompt based on these settings:
- Tone: ${tone}
- Purpose: ${purpose}
- Output Depth: ${depth}

Make the prompt clear, well-structured, and high-performing. Return ONLY the optimized prompt text, nothing else.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
      });

      const optimizedPrompt = response.choices[0].message.content || "";

      const scoreResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a prompt quality evaluator. Score the following optimized prompt on a scale of 0-100 based on:
- Clarity (how clear and unambiguous it is)
- Structure (how well-organized it is)
- Specificity (how detailed and specific the instructions are)

Return ONLY a single integer number between 0 and 100. Nothing else.`
          },
          { role: "user", content: optimizedPrompt }
        ],
      });

      const scoreText = scoreResponse.choices[0].message.content || "75";
      const promptScore = Math.min(100, Math.max(0, parseInt(scoreText.trim(), 10) || 75));

      const saved = await storage.createOptimization({
        originalPrompt: prompt,
        optimizedPrompt,
      });

      res.json({ optimizedPrompt: saved.optimizedPrompt, promptScore });
    } catch (error: any) {
      const message = error?.message?.includes("API") 
        ? "AI service is temporarily unavailable. Please try again in a moment."
        : "Failed to optimize prompt. Please try again.";
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
