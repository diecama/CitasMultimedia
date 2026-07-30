import type { D1Database } from "@cloudflare/workers-types";
import { getRequestEvent } from "@tanstack/react-start/server";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

/**
 * Retrieve a Drizzle DB instance bound to the Cloudflare D1 database
 * from the current request event.  Call only inside server-side code
 * (server functions, loaders, middleware).
 *
 * Usage:
 *   const db = getDB();
 *   const rows = await db.select().from(schema.companions).all();
 */
export function getDB() {
  const event = getRequestEvent();

  // TanStack Start on Cloudflare Workers injects the env bindings
  // into event.context.cloudflare.env (shaped by wrangler.toml).
  // @ts-expect-error - cloudflare.env is injected at runtime
  const cloudflare = event.context.cloudflare as
    | { env: { DB: D1Database } }
    | undefined;

  if (!cloudflare?.env?.DB) {
    throw new Error(
      "D1 binding not available. Ensure the request is running inside " +
        "a Cloudflare Workers environment with a [[d1_databases]] binding " +
        'named "DB" in wrangler.toml.',
    );
  }

  return drizzle(cloudflare.env.DB, { schema });
}

/**
 * Thin wrapper that returns the raw D1 binding — useful for prepared
 * statements or tools that don't go through Drizzle.
 */
export function getD1(): D1Database {
  const db = getDB();
  // Drizzle's D1 instance stores the binding at session.db
  return (db as unknown as { session: { db: D1Database } }).session.db;
}