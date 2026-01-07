import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const optimizations = pgTable("optimizations", {
  id: serial("id").primaryKey(),
  originalPrompt: text("original_prompt").notNull(),
  optimizedPrompt: text("optimized_prompt").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOptimizationSchema = createInsertSchema(optimizations).omit({
  id: true,
  createdAt: true,
});

export type InsertOptimization = z.infer<typeof insertOptimizationSchema>;
export type Optimization = typeof optimizations.$inferSelect;

export * from "./models/chat";
