import { z } from "zod";
import { insertOptimizationSchema, optimizations } from "./schema";

export const api = {
  optimize: {
    generate: {
      method: "POST" as const,
      path: "/api/optimize",
      input: z.object({
        prompt: z.string().min(1, "Prompt is required").max(1000, "Prompt must be under 1000 characters"),
        tone: z.enum(["Professional", "Casual", "Creative", "Technical"]).default("Professional"),
        purpose: z.enum(["Blog Post", "Email", "Social Media", "Coding", "AI Art"]).default("Blog Post"),
        depth: z.enum(["Short", "Medium", "Detailed"]).default("Medium"),
      }),
      responses: {
        200: z.object({
          optimizedPrompt: z.string(),
          promptScore: z.number().min(0).max(100),
        }),
        500: z.object({ message: z.string() }),
      },
    },
    history: {
      method: "GET" as const,
      path: "/api/history",
      responses: {
        200: z.array(z.custom<typeof optimizations.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
