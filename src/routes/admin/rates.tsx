import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRates } from "@/server/functions/settings";

export const Route = createFileRoute("/admin/rates")({
  component: RatesAdmin,
});

function RatesAdmin() {
  const { data: ratesData } = useSuspenseQuery({
    queryKey: ["rates"],
    queryFn: () => getRates(),
  });

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-tighter">Tarifas</h1>
          <p className="text-white/50 mt-2 text-sm">
            Tarifas base mostradas en el sitio público.
          </p>
        </div>
        <button className="border border-gold/40 text-gold px-4 py-2 text-[10px] uppercase tracking-[0.3em] hover:bg-gold hover:text-primary-foreground transition-colors">
          + Añadir
        </button>
      </div>
      <div className="space-y-3">
        {ratesData.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 items-center border border-white/5 bg-card/40 p-4"
          >
            <input
              defaultValue={r.label}
              className="bg-transparent border border-white/10 px-3 py-2 text-white/90 outline-none focus:border-gold/60"
            />
            <input
              defaultValue={r.note}
              className="bg-transparent border border-white/10 px-3 py-2 text-white/70 outline-none focus:border-gold/60"
            />
            <input
              defaultValue={r.price}
              className="w-24 bg-transparent border border-white/10 px-3 py-2 text-gold font-display italic outline-none focus:border-gold/60"
            />
            <button className="text-[10px] uppercase tracking-[0.25em] text-white/40 hover:text-red-400">
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}