// Client-side age verification gate. Session-scoped: a visitor confirms they
// are over 18 once per browser session.

const STORAGE_KEY = "elite_age_ok";

export function isAgeVerified(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(STORAGE_KEY) === "1";
}

export function verifyAge(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, "1");
  // The "Entrar" button doubles as the user gesture browsers require before
  // media can autoplay — notify AmbientMusic so it can fade the track in.
  window.dispatchEvent(new CustomEvent("elite:age-verified"));
}
