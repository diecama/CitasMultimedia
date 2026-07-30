import { createServerFn } from "@tanstack/react-start";
import { getDB } from "@/server/db";
import { schedules, rates, settings, bookings } from "@/server/db/schema";
import { eq } from "drizzle-orm";

/* ═══════════════════════════════════════════════
 *  SCHEDULES
 * ═══════════════════════════════════════════════ */

export type ScheduleRow = {
  id: number;
  day: string;
  hours: string;
};

export const getSchedules = createServerFn({ method: "GET" }).handler(
  async (): Promise<ScheduleRow[]> => {
    const db = getDB();
    const rows = await db
      .select()
      .from(schedules)
      .orderBy(schedules.sortOrder)
      .all();
    return rows.map((r) => ({ id: r.id, day: r.day, hours: r.hours }));
  },
);

export const updateSchedule = createServerFn({ method: "POST" }).handler(
  async (data: { id: number; day?: string; hours?: string }): Promise<{ ok: boolean }> => {
    const db = getDB();
    const updateData: Record<string, unknown> = {};
    if (data.day !== undefined) updateData.day = data.day;
    if (data.hours !== undefined) updateData.hours = data.hours;
    if (Object.keys(updateData).length > 0) {
      await db.update(schedules).set(updateData as never).where(eq(schedules.id, data.id));
    }
    return { ok: true };
  },
);

/* ═══════════════════════════════════════════════
 *  RATES
 * ═══════════════════════════════════════════════ */

export type RateRow = {
  id: number;
  label: string;
  price: string;
  note: string;
};

export const getRates = createServerFn({ method: "GET" }).handler(
  async (): Promise<RateRow[]> => {
    const db = getDB();
    const rows = await db.select().from(rates).orderBy(rates.sortOrder).all();
    return rows.map((r) => ({ id: r.id, label: r.label, price: r.price, note: r.note }));
  },
);

export const updateRate = createServerFn({ method: "POST" }).handler(
  async (data: {
    id: number;
    label?: string;
    price?: string;
    note?: string;
  }): Promise<{ ok: boolean }> => {
    const db = getDB();
    const updateData: Record<string, unknown> = {};
    if (data.label !== undefined) updateData.label = data.label;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.note !== undefined) updateData.note = data.note;
    if (Object.keys(updateData).length > 0) {
      await db.update(rates).set(updateData as never).where(eq(rates.id, data.id));
    }
    return { ok: true };
  },
);

export const createRate = createServerFn({ method: "POST" }).handler(
  async (data: {
    label: string;
    price: string;
    note: string;
  }): Promise<RateRow> => {
    const db = getDB();
    const result = await db
      .insert(rates)
      .values({ label: data.label, price: data.price, note: data.note })
      .returning()
      .all();
    const row = result[0]!;
    return { id: row.id, label: row.label, price: row.price, note: row.note };
  },
);

export const deleteRate = createServerFn({ method: "POST" }).handler(
  async (id: number): Promise<{ ok: boolean }> => {
    const db = getDB();
    await db.delete(rates).where(eq(rates.id, id));
    return { ok: true };
  },
);

/* ═══════════════════════════════════════════════
 *  SETTINGS (key-value)
 * ═══════════════════════════════════════════════ */

export type SettingsMap = Record<string, string>;

export const getAllSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<SettingsMap> => {
    const db = getDB();
    const rows = await db.select().from(settings).all();
    const map: SettingsMap = {};
    for (const row of rows) {
      map[row.key] = row.value;
    }
    return map;
  },
);

export const updateSetting = createServerFn({ method: "POST" }).handler(
  async (data: { key: string; value: string }): Promise<{ ok: boolean }> => {
    const db = getDB();
    await db
      .insert(settings)
      .values({ key: data.key, value: data.value })
      .onConflictDoUpdate({ target: settings.key, set: { value: data.value } })
      .all();
    return { ok: true };
  },
);

/* ═══════════════════════════════════════════════
 *  BOOKINGS
 * ═══════════════════════════════════════════════ */

export type BookingRow = {
  id: string;
  client: string;
  companionId: string | null;
  companionName: string;
  date: string;
  duration: string;
  status: string;
};

export const getBookings = createServerFn({ method: "GET" }).handler(
  async (): Promise<BookingRow[]> => {
    const db = getDB();
    const rows = await db.select().from(bookings).orderBy(bookings.createdAt).all();
    return rows.map((r) => ({
      id: r.id,
      client: r.client,
      companionId: r.companionId,
      companionName: r.companionName,
      date: r.date,
      duration: r.duration,
      status: r.status,
    }));
  },
);

export const updateBookingStatus = createServerFn({ method: "POST" }).handler(
  async (data: {
    id: string;
    status: string;
  }): Promise<{ ok: boolean }> => {
    const db = getDB();
    await db.update(bookings).set({ status: data.status }).where(eq(bookings.id, data.id));
    return { ok: true };
  },
);