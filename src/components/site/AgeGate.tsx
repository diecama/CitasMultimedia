import { useEffect, useRef, useState } from "react";

import { isAgeVerified, verifyAge } from "@/lib/age-gate";

/**
 * Entry interstitial: confirms the visitor is over 18 before showing the site.
 *
 * Built as a custom (non-dismissable) overlay rather than a Radix Dialog on
 * purpose: a Radix Dialog exposes an Escape key and a backdrop click that
 * would let a visitor bypass the age check. This gate only closes by
 * explicitly confirming or leaving.
 *
 * Client-side only (reads sessionStorage) to avoid SSR mismatch; session-scoped.
 */
export function AgeGate() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    if (!isAgeVerified()) {
      setShow(true);
      confirmRef.current?.focus();
    }
  }, []);

  function handleConfirm() {
    verifyAge();
    setShow(false);
  }

  function handleLeave() {
    window.location.href = "https://www.google.com";
  }

  if (!mounted || !show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-desc"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md px-4 gate-in"
    >
      <div className="w-full max-w-lg border border-gold/30 bg-card/60 p-10 text-center">
        <span className="font-display italic text-4xl text-gold tracking-tighter block mb-6">
          L'Élite
        </span>

        <div className="inline-block border border-red-900/50 text-red-400/80 text-[10px] uppercase tracking-[0.4em] px-4 py-2 mb-8">
          Solo adultos +18
        </div>

        <h2 id="age-gate-title" className="sr-only">
          Verificación de edad
        </h2>
        <p
          id="age-gate-desc"
          className="text-white/70 text-sm leading-relaxed max-w-sm mx-auto mb-10"
        >
          Este sitio es un directorio privado para adultos. Al continuar confirma ser mayor de 18
          años y aceptar el acceso a contenido destinado exclusivamente a un público adulto.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            ref={confirmRef}
            type="button"
            onClick={handleConfirm}
            data-elite-control
            className="text-[11px] uppercase tracking-[0.3em] font-semibold bg-gold text-primary-foreground px-8 py-3.5 hover:bg-gold-soft transition-colors"
          >
            Soy mayor de 18 — Entrar
          </button>
          <button
            type="button"
            onClick={handleLeave}
            data-elite-control
            className="text-[11px] uppercase tracking-[0.3em] text-white/50 border border-white/15 px-8 py-3.5 hover:text-white hover:border-white/30 transition-colors"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}
