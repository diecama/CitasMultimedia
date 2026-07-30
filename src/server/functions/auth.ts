import { createServerFn } from "@tanstack/react-start";
import { getDB } from "@/server/db";
import { users, sessions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

/* ───────────────────────────────────────────────
 *  Crypto helpers (Web Crypto API — works in CF Workers)
 * ─────────────────────────────────────────────── */

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    key,
    256,
  );
  const saltB64 = btoa(String.fromCharCode(...salt));
  const hashB64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
  return `${saltB64}:${hashB64}`;
}

async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [saltB64, hashB64] = stored.split(":");
  if (!saltB64 || !hashB64) return false;
  const salt = Uint8Array.from(atob(saltB64), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    key,
    256,
  );
  const expectedB64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
  return hashB64 === expectedB64;
}

function generateToken(): string {
  return crypto.randomUUID();
}

/* ───────────────────────────────────────────────
 *  Server Functions
 * ─────────────────────────────────────────────── */

export type LoginResult =
  | { ok: true; token: string; username: string }
  | { ok: false; error: string };

/**
 * Authenticate user and return a session token.
 * The caller (login page) sets the cookie client-side from the response.
 */
export const loginFn = createServerFn({ method: "POST" }).handler(
  async (data: { username: string; password: string }): Promise<LoginResult> => {
    try {
      const db = getDB();

      // Find user
      const userList = await db
        .select()
        .from(users)
        .where(eq(users.username, data.username))
        .limit(1)
        .all();

      const user = userList[0];
      if (!user) {
        return { ok: false, error: "Usuario o contraseña incorrectos" };
      }

      // Verify password
      const valid = await verifyPassword(data.password, user.passwordHash);
      if (!valid) {
        return { ok: false, error: "Usuario o contraseña incorrectos" };
      }

      // Create session (24h expiry)
      const token = generateToken();
      const now = Math.floor(Date.now() / 1000);
      const expiresAt = now + 86_400; // 24 hours

      await db.insert(sessions).values({
        id: crypto.randomUUID(),
        userId: user.id,
        token,
        expiresAt: new Date(expiresAt * 1000),
      });

      return { ok: true, token, username: user.username };
    } catch (err) {
      console.error("loginFn error:", err);
      return { ok: false, error: "Error interno del servidor" };
    }
  },
);

export type SessionData = {
  authenticated: boolean;
  username?: string;
  userId?: string;
};

/**
 * Check if a session token is valid and not expired.
 * Used by the admin layout to verify auth on every page load.
 */
export const verifySessionFn = createServerFn({ method: "GET" }).handler(
  async (token: string): Promise<SessionData> => {
    try {
      if (!token) return { authenticated: false };

      const db = getDB();
      const sessionList = await db
        .select()
        .from(sessions)
        .where(eq(sessions.token, token))
        .limit(1)
        .all();

      const session = sessionList[0];
      if (!session) return { authenticated: false };

      const now = Math.floor(Date.now() / 1000);
      const expiresSec =
        session.expiresAt instanceof Date
          ? Math.floor(session.expiresAt.getTime() / 1000)
          : (session.expiresAt as number);

      if (now > expiresSec) {
        // Delete expired session
        await db.delete(sessions).where(eq(sessions.id, session.id));
        return { authenticated: false };
      }

      // Get username
      const userList = await db
        .select()
        .from(users)
        .where(eq(users.id, session.userId))
        .limit(1)
        .all();

      const user = userList[0];
      return {
        authenticated: true,
        username: user?.username ?? "admin",
        userId: session.userId,
      };
    } catch (err) {
      console.error("verifySessionFn error:", err);
      return { authenticated: false };
    }
  },
);

/**
 * Destroy a session (logout).
 */
export const logoutFn = createServerFn({ method: "POST" }).handler(
  async (token: string): Promise<{ ok: boolean }> => {
    try {
      if (!token) return { ok: true };
      const db = getDB();
      await db.delete(sessions).where(eq(sessions.token, token));
      return { ok: true };
    } catch (err) {
      console.error("logoutFn error:", err);
      return { ok: false };
    }
  },
);

/**
 * Create the initial admin user if none exists.
 * Call this once during setup.
 */
export const setupAdminFn = createServerFn({ method: "POST" }).handler(
  async (data: {
    username: string;
    password: string;
  }): Promise<{ ok: boolean; error?: string }> => {
    try {
      const db = getDB();

      // Check if any user exists
      const existing = await db.select().from(users).limit(1).all();
      if (existing.length > 0) {
        return { ok: false, error: "Ya existe un usuario administrador" };
      }

      const hash = await hashPassword(data.password);
      await db.insert(users).values({
        id: crypto.randomUUID(),
        username: data.username,
        passwordHash: hash,
      });

      return { ok: true };
    } catch (err) {
      console.error("setupAdminFn error:", err);
      return { ok: false, error: "Error al crear administrador" };
    }
  },
);

/**
 * Check if admin user exists (to decide whether to show setup or login).
 */
export const hasAdminFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<boolean> => {
    try {
      const db = getDB();
      const existing = await db.select().from(users).limit(1).all();
      return existing.length > 0;
    } catch {
      return false;
    }
  },
);