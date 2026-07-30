import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getCompanions } from "@/server/functions/companions";

export const Route = createFileRoute("/admin/companions")({
  component: CompanionsAdmin,
});

function CompanionsAdmin() {
  const { data: companionsData } = useSuspenseQuery({
    queryKey: ["companions"],
    queryFn: () => getCompanions(),
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-tighter">Acompañantes</h1>
          <p className="text-white/50 mt-2 text-sm">
            Gestione perfiles, fotos, tarifas y disponibilidad.
          </p>
        </div>
        <button className="bg-gold text-primary-foreground px-6 py-3 text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-gold-soft transition-colors">
          + Nuevo perfil
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companionsData.map((c) => (
          <article
            key={c.id}
            className="border border-white/5 bg-card/40 overflow-hidden group"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gold/10 grid place-items-center">
              <span className="text-6xl font-display italic text-gold/40">
                {c.name.charAt(0)}
              </span>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl">{c.name}</h3>
                <span className="text-gold font-display italic text-xl">€{c.hourly}</span>
              </div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                {c.age} años · {c.city}
              </p>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span
                  className={`size-1.5 rounded-full ${
                    c.available ? "bg-emerald-400" : "bg-white/30"
                  }`}
                />
                {c.available ? "Disponible" : "Ocupada"}
              </div>
              <div className="flex gap-2 pt-3 border-t border-white/5">
                <button className="flex-1 border border-white/10 text-[10px] uppercase tracking-[0.25em] py-2 hover:border-gold hover:text-gold transition-colors">
                  Editar
                </button>
                <button className="flex-1 text-[10px] uppercase tracking-[0.25em] py-2 text-white/40 hover:text-red-400 transition-colors">
                  Ocultar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}