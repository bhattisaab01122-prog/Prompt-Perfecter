import { db } from "./db";
import { optimizations, type InsertOptimization, type Optimization } from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  createOptimization(opt: InsertOptimization): Promise<Optimization>;
  getOptimizations(): Promise<Optimization[]>;
}

export class DatabaseStorage implements IStorage {
  async createOptimization(opt: InsertOptimization): Promise<Optimization> {
    const [optimization] = await db
      .insert(optimizations)
      .values(opt)
      .returning();
    return optimization;
  }

  async getOptimizations(): Promise<Optimization[]> {
    return await db
      .select()
      .from(optimizations)
      .orderBy(desc(optimizations.createdAt));
  }
}

export const storage = new DatabaseStorage();
