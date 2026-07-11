import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error("[db] ERROR: DATABASE_URL is not set — database operations will fail.");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://localhost/unused",
});

export const db = drizzle(pool, { schema });

// Test the connection immediately so Render logs show the exact error
pool.connect()
  .then((client) => {
    console.log("[db] Database connection successful.");
    client.release();
  })
  .catch((err: Error) => {
    console.error("[db] Database connection FAILED:", err.message);
    console.error("[db] CONNECTION STRING in use:", process.env.DATABASE_URL
      ? process.env.DATABASE_URL.replace(/:\/\/[^@]+@/, "://<credentials>@")
      : "(not set)");
  });
