import { createServerFn } from "@tanstack/react-start";
import { getDB } from "@/server/db";
import { companions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

/* ───────────────────────────────────────────────
 *  Types
 * ─────────────────────────────────────────────── */

export type CompanionRow = {
  id: string;
  name: string;
  age: number;
  height: string;
  city: string;
  tag: string;
  hourly: number;
  images: string[];
  available: boolean;
  languages: string[];
  bio: string;
};

/* ───────────────────────────────────────────────
 *  Server Functions
 * ─────────────────────────────────────────────── */

/**
 * Get all companions, parsed from D1.
 */
export const getCompanions = createServerFn({ method: "GET" }).handler(
  async (): Promise<CompanionRow[]> => {
    const db = getDB();
    const rows = await db.select().from(companions).all();
    return rows.map(parseCompanion);
  },
);

/**
 * Get a single companion by ID.
 */
export const getCompanion = createServerFn({ method: "GET" }).handler(
  async (id: string): Promise<CompanionRow | null> => {
    const db = getDB();
    const rows = await db
      .select()
      .from(companions)
      .where(eq(companions.id, id))
      .limit(1)
      .all();
    return rows[0] ? parseCompanion(rows[0]) : null;
  },
);

/**
 * Create a new companion.
 */
export const createCompanion = createServerFn({ method: "POST" }).handler(
  async (
    data: Omit<CompanionRow, "tags"> & { tags?: string },
  ): Promise<CompanionRow> => {
    const db = getDB();
    const id = data.id || crypto.randomUUID().slice(0, 8);
    await db.insert(companions).values({
      id,
      name: data.name,
      age: data.age,
      height: data.height,
      city: data.city,
      tag: data.tag ?? "Nueva",
      hourly: data.hourly,
      images: JSON.stringify(data.images),
      available: data.available ?? true,
      languages: JSON.stringify(data.languages),
      bio: data.bio ?? "",
    });
    const result = await getCompanion(id);
    return result!;
  },
);

/**
 * Update a companion.
 */
export const updateCompanion = createServerFn({ method: "POST" }).handler(
  async (
    data: Partial<CompanionRow> & { id: string },
  ): Promise<CompanionRow | null> => {
    const db = getDB();
    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.age !== undefined) updateData.age = data.age;
    if (data.height !== undefined) updateData.height = data.height;
    if (data.city !== undefined) updateData.city = data.city;
    if (data.tag !== undefined) updateData.tag = data.tag;
    if (data.hourly !== undefined) updateData.hourly = data.hourly;
    if (data.available !== undefined) updateData.available = data.available;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.images !== undefined) updateData.images = JSON.stringify(data.images);
    if (data.languages !== undefined)
      updateData.languages = JSON.stringify(data.languages);

    if (Object.keys(updateData).length === 0) return getCompanion(data.id);

    await db
      .update(companions)
      .set(updateData as never)
      .where(eq(companions.id, data.id));

    return getCompanion(data.id);
  },
);

/**
 * Delete a companion.
 */
export const deleteCompanion = createServerFn({ method: "POST" }).handler(
  async (id: string): Promise<{ ok: boolean }> => {
    const db = getDB();
    await db.delete(companions).where(eq(companions.id, id));
    return { ok: true };
  },
);

/* ── Helpers ─────────────────────────────────── */

function parseCompanion(row: typeof companions.$inferSelect): CompanionRow {
  return {
    id: row.id,
    name: row.name,
    age: row.age,
    height: row.height,
    city: row.city,
    tag: row.tag,
    hourly: row.hourly,
    images: JSON.parse(row.images),
    available: row.available,
    languages: JSON.parse(row.languages),
    bio: row.bio,
  };
}