import { lazy, Suspense, useEffect, useState } from "react";
import { location } from "@/data/companions";

const MapView = lazy(() => import("./MapView"));

export function LocationSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="ubicacion"
      className="border-t border-white/5 py-32 px-6"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">
        <div data-scroll-reveal>
          <span className="text-gold text-[11px] uppercase tracking-[0.3em]">
            — La Residencia
          </span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 mb-10 tracking-tighter">
            Ubicación <span className="italic text-gold">privada</span>.
          </h2>
          <div className="space-y-8">
            <Field label="Dirección" value={location.address} />
            <Field label="Reservas" value={location.phone} />
            <Field label="Correo" value={location.email} />
            <Field label="Acceso" value="Parking privado y entrada independiente" />
          </div>
          <p className="mt-10 text-white/50 text-sm leading-relaxed max-w-md">
            La dirección exacta y códigos de acceso se comparten únicamente tras
            confirmar la reserva. Discreción absoluta garantizada.
          </p>
        </div>

        <div className="relative" data-scroll-reveal>
          <div className="relative overflow-hidden">
            {mounted ? (
              <Suspense
                fallback={
                  <div className="w-full h-[420px] bg-secondary/40 animate-pulse" />
                }
              >
                <MapView />
              </Suspense>
            ) : (
              <div className="w-full h-[420px] bg-secondary/40" />
            )}
          </div>
          <div className="absolute -bottom-6 -left-6 bg-background border border-gold/20 p-8 max-w-xs shadow-2xl">
            <p className="text-gold text-[10px] uppercase tracking-[0.3em] mb-2">
              Barrio de Salamanca
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Ubicación exclusiva en el distrito más elegante de Madrid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="text-gold text-[10px] uppercase tracking-[0.3em] mb-2">
        {label}
      </h4>
      <p className="text-xl text-white/90 font-display italic">{value}</p>
    </div>
  );
}