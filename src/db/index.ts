import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const client = neon(process.env.DATABASE_URL);

const db = drizzle({
  client: client,
  schema,
  // logger: true
});

export type db = typeof db;

export type client = typeof client;

export default db;
