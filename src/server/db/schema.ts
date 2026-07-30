import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

/* ───────────────────────────────────────────────
 *  Users & Sessions (auth)
 * ─────────────────────────────────────────────── */

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s','now'))`),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s','now'))`),
});

/* ───────────────────────────────────────────────
 *  Companions
 * ─────────────────────────────────────────────── */

export const companions = sqliteTable("companions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  height: text("height").notNull(),
  city: text("city").notNull(),
  tag: text("tag").notNull().default("Nueva"),
  hourly: integer("hourly").notNull(),
  images: text("images").notNull(), // JSON array of image paths
  available: integer("available", { mode: "boolean" }).notNull().default(true),
  languages: text("languages").notNull(), // JSON array
  bio: text("bio").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s','now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s','now'))`),
});

/* ───────────────────────────────────────────────
 *  Schedules (agency hours)
 * ─────────────────────────────────────────────── */

export const schedules = sqliteTable("schedules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  day: text("day").notNull(),
  hours: text("hours").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

/* ───────────────────────────────────────────────
 *  Rates (pricing)
 * ─────────────────────────────────────────────── */

export const rates = sqliteTable("rates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  price: text("price").notNull(),
  note: text("note").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

/* ───────────────────────────────────────────────
 *  Settings (location & contact)
 * ─────────────────────────────────────────────── */

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

/* ───────────────────────────────────────────────
 *  Bookings
 * ─────────────────────────────────────────────── */

export const bookings = sqliteTable("bookings", {
  id: text("id").primaryKey(),
  client: text("client").notNull(),
  companionId: text("companion_id").references(() => companions.id, {
    onDelete: "set null",
  }),
  companionName: text("companion_name").notNull(),
  date: text("date").notNull(),
  duration: text("duration").notNull(),
  status: text("status").notNull().default("Pendiente"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s','now'))`),
});