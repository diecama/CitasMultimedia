import { createFileRoute } from "@tanstack/react-router";
import { location } from "@/data/companions";
import { lazy, Suspense, useEffect, useState } from "react";

const MapView = lazy(() => import("@/components/site/MapView"));

export const Route = createFileRoute("/admin/location")({
  component: LocationAdmin,
});

function LocationAdmin() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl tracking-tighter">Ubicación</h1>
        <p className="text-white/50 mt-2 text-sm">
          Dirección, contacto y mapa mostrados públicamente.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4 border border-white/5 bg-card/40 p-6">
          <Field label="Dirección" defaultValue={location.address} />
          <Field label="Teléfono" defaultValue={location.phone} />
          <Field label="Email" defaultValue={location.email} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Latitud" defaultValue={String(location.lat)} />
            <Field label="Longitud" defaultValue={String(location.lng)} />
          </div>
          <button className="w-full mt-4 bg-gold text-primary-foreground py-3 text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-gold-soft transition-colors">
            Actualizar ubicación
          </button>
        </div>
        <div>
          {mounted ? (
            <Suspense fallback={<div className="h-[420px] bg-secondary/40 animate-pulse" />}>
              <MapView />
            </Suspense>
          ) : (
            <div className="h-[420px] bg-secondary/40" />
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        className="w-full bg-transparent border border-white/10 focus:border-gold/60 px-4 py-3 text-white/90 outline-none transition-colors"
      />
    </div>
  );
}