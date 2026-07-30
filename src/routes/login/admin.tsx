import {
  createFileRoute,
  Link,
  useNavigate,
  redirect,
} from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { login, verifySession, checkHasAdmin, setupAdmin } from "@/lib/admin-auth";

export const Route = createFileRoute("/login/admin")({
  head: () => ({
    meta: [
      { title: "Acceso Admin — L'Élite" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"loading" | "setup" | "login">("loading");

  // On mount, check if admin user exists and if already authenticated
  useEffect(() => {
    (async () => {
      // If already authenticated, redirect to admin
      const session = await verifySession();
      if (session.authenticated) {
        navigate({ to: "/admin", replace: true });
        return;
      }

      // Check if admin user exists
      const hasAdmin = await checkHasAdmin();
      setMode(hasAdmin ? "login" : "setup");
    })();
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(false);
    setErrorMsg("");

    if (mode === "setup") {
      // First-run: create admin user
      const result = await setupAdmin(username, password);
      if ("error" in result && result.error) {
        setError(true);
        setErrorMsg(result.error);
        setLoading(false);
        return;
      }
      // Now login with the new credentials
      const loginResult = await login(username, password);
      if (loginResult.ok) {
        navigate({ to: "/admin", replace: true });
      } else {
        setError(true);
        setErrorMsg("Error al iniciar sesión después de crear el admin");
      }
      setLoading(false);
      return;
    }

    // Regular login mode
    const result = await login(username, password);
    if (result.ok) {
      navigate({ to: "/admin", replace: true });
    } else {
      setError(true);
      setErrorMsg(result.error || "Credenciales incorrectas");
    }
    setLoading(false);
  }

  if (mode === "loading") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
          Cargando…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="font-display italic text-3xl text-gold tracking-tighter block text-center"
        >
          L'Élite
        </Link>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-2 text-center">
          {mode === "setup" ? "Configuración inicial" : "Acceso privado"}
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {mode === "setup" && (
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2">
                Usuario
              </label>
              <input
                type="text"
                autoFocus
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(false);
                }}
                className="w-full bg-transparent border-b border-white/15 px-1 py-2 text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none transition-colors"
                placeholder="admin"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2">
              {mode === "setup" ? "Contraseña" : "Clave de acceso"}
            </label>
            <input
              type="password"
              autoFocus={mode === "login"}
              autoComplete={mode === "setup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full bg-transparent border-b border-white/15 px-1 py-2 text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[11px] text-red-400/80 uppercase tracking-[0.2em]">
              {errorMsg || "Credenciales incorrectas"}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-[11px] uppercase tracking-[0.22em] text-primary-foreground bg-gold py-3 hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {loading
              ? "Verificando…"
              : mode === "setup"
                ? "Crear administrador"
                : "Ingresar"}
          </button>
        </form>

        <Link
          to="/"
          className="mt-8 block text-center text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-gold transition-colors"
        >
          ← Volver al sitio
        </Link>
      </div>
    </div>
  );
}