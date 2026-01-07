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
      const { prompt } = api.optimize.generate.input.parse(req.body);

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { 
            role: "system", 
            content: "You are an expert prompt engineer. Your goal is to optimize the user's prompt to be clearer, more specific, and more effective for Large Language Models. Return only the optimized prompt." 
          },
          { role: "user", content: prompt }
        ],
      });

      const optimizedPrompt = response.choices[0].message.content || "";

      const saved = await storage.createOptimization({
        originalPrompt: prompt,
        optimizedPrompt,
      });

      res.json({ optimizedPrompt: saved.optimizedPrompt });
    } catch (error) {
      console.error("OpenAI Error:", error);
      res.status(500).json({ message: "Failed to optimize prompt" });
    }
  });

  app.get(api.optimize.history.path, async (req, res) => {
    const history = await storage.getOptimizations();
    res.json(history);
  });

  // Seed data if empty
  const existing = await storage.getOptimizations();
  if (existing.length === 0) {
    await storage.createOptimization({
      originalPrompt: "Write a blog post about AI.",
      optimizedPrompt: "Write a comprehensive and engaging blog post about the current state of Artificial Intelligence, focusing on its impact on creative industries. Include real-world examples, potential future developments, and address common ethical concerns. The tone should be informative yet accessible to a general audience.",
    });
  }

  return httpServer;
}
