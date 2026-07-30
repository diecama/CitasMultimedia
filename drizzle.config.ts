import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: "d1-http", // important for Cloudflare D1
  dbCredentials: {
    // Binding name must match wrangler.toml (see below)
    accountId: "", // ignored by d1-http in workers/local; filled at runtime
    databaseId: "", // ignored
    token: "" // ignored
  }
});