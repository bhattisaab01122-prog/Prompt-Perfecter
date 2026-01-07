import { z } from "zod";
import { insertOptimizationSchema, optimizations } from "./schema";

export const api = {
  optimize: {
    generate: {
      method: "POST" as const,
      path: "/api/optimize",
      input: z.object({
        prompt: z.string().min(1, "Prompt is required"),
      }),
      responses: {
        200: z.object({
          optimizedPrompt: z.string(),
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
