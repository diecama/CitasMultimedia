/**
 * Client-side admin auth helpers.
 *
 * These call server-side functions that verify credentials against the
 * Cloudflare D1 database.  Session tokens are stored in an HTTP-only
 * cookie (set by the login page) AND mirrored in sessionStorage for
 * instant client-side UI gating.
 *
 * The server-side check in the admin layout is the REAL security boundary.
 * The client-side mirror is purely for UX (instant redirects, no flash).
 */

import { loginFn, logoutFn, verifySessionFn, setupAdminFn, hasAdminFn } from "@/server/functions/auth";
import type { LoginResult, SessionData } from "@/server/functions/auth";

// Session-storage flag for client-side UI gating
const STORAGE_KEY = "elite_admin_token";

/* ── Token helpers ───────────────────────────────────────────── */

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(STORAGE_KEY);
}

function setToken(token: string) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(STORAGE_KEY, token);
  }
}

function clearToken() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(STORAGE_KEY);
  }
}

/* ── Public API ─────────────────────────────────────────────── */

/**
 * Quick client-side check — is there a token in sessionStorage?
 * NOTE: This is NOT a security check. The real auth happens server-side.
 */
export function hasStoredToken(): boolean {
  return getToken() !== null;
}

/**
 * Check if the admin user has been created (for first-run setup).
 */
export async function checkHasAdmin(): Promise<boolean> {
  return hasAdminFn();
}

/**
 * Authenticate with the server.  On success the server returns a
 * session token that the client stores both as a cookie and in
 * sessionStorage.
 */
export async function login(
  username: string,
  password: string,
): Promise<LoginResult> {
  const result = await loginFn({ username, password });
  if (result.ok) {
    setToken(result.token);
  }
  return result;
}

/**
 * Log out — destroy the session on the server and clear local state.
 */
export async function logout(): Promise<void> {
  const token = getToken();
  if (token) {
    try {
      await logoutFn(token);
    } catch {
      // Best-effort; clear locally regardless
    }
  }
  clearToken();
  // Also clear the cookie
  if (typeof document !== "undefined") {
    document.cookie =
      "elite_session=; Max-Age=0; Path=/; Domain=" +
      window.location.hostname +
      "; Secure; SameSite=Lax";
  }
}

/**
 * Verify that the stored session token is still valid on the server.
 * Returns session data (authenticated: true/false).
 */
export async function verifySession(): Promise<SessionData> {
  const token = getToken();
  if (!token) return { authenticated: false };
  return verifySessionFn(token);
}

/**
 * Create the initial admin user (first-run setup only).
 */
export async function setupAdmin(username: string, password: string) {
  return setupAdminFn({ username, password });
}