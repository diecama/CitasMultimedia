import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getCompanions } from "@/server/functions/companions";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

const stats = [
  { label: "Perfiles activos", key: "active", trend: "+3 este mes" },
  { label: "Visitas hoy", value: "1.240", trend: "+18%" },
  { label: "Reservas pendientes", key: "pending", trend: "3 nuevas" },
  { label: "Ingresos (mes)", value: "€14.2k", trend: "+22%" },
];

function Dashboard() {
  const { data: companionsData } = useSuspenseQuery({
    queryKey: ["companions"],
    queryFn: () => getCompanions(),
  });

  const activeCompanions = companionsData.filter((c) => c.available).length;
  const pendingBookings = 3; // Placeholder — will come from getBookings later

  const displayStats = stats.map((s) => ({
    ...s,
    value:
      s.key === "active"
        ? String(activeCompanions)
        : s.key === "pending"
          ? String(pendingBookings)
          : s.value ?? "—",
  }));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl tracking-tighter">
          Buenas noches, <span className="italic text-gold">Admin</span>.
        </h1>
        <p className="text-white/50 mt-2 text-sm">
          Resumen del rendimiento de la agencia ·{" "}
          {new Date().toLocaleDateString("es-ES", { dateStyle: "full" })}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayStats.map((s) => (
          <div
            key={s.label}
            className="border border-white/5 bg-card/40 p-6 hover:border-gold/30 transition-colors"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              {s.label}
            </p>
            <p className="font-display text-4xl italic text-white mt-3">{s.value}</p>
            <p className="text-[11px] text-gold mt-2">{s.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-white/5 bg-card/40 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl">Perfiles recientes</h2>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Todos los perfiles
            </span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.25em] text-white/40">
                <th className="py-3 text-left font-medium">Nombre</th>
                <th className="py-3 text-left font-medium">Estado</th>
                <th className="py-3 text-left font-medium">Tarifa</th>
                <th className="py-3 text-right font-medium">Acción</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {companionsData.map((c) => (
                <tr key={c.id} className="border-b border-white/5">
                  <td className="py-4 flex items-center gap-3">
                    <span className="size-9 rounded-full bg-gold/20 border border-gold/30 grid place-items-center text-gold text-xs">
                      {c.name.charAt(0)}
                    </span>
                    <span className="text-white/90">{c.name}</span>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-2 text-white/70">
                      <span
                        className={`size-1.5 rounded-full ${
                          c.available ? "bg-emerald-400" : "bg-white/30"
                        }`}
                      />
                      {c.available ? "Disponible" : "Ocupada"}
                    </span>
                  </td>
                  <td className="py-4 text-gold font-display italic">€{c.hourly}</td>
                  <td className="py-4 text-right">
                    <button className="text-[11px] uppercase tracking-[0.25em] text-white/50 hover:text-gold transition-colors">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border border-white/5 bg-card/40 p-6">
          <h2 className="font-display text-2xl mb-6">Próximas reservas</h2>
          <div className="space-y-4">
            {[
              { name: "Elena", time: "22:00 · Hoy", client: "VIP #4821" },
              { name: "Isabella", time: "01:30 · Mañana", client: "VIP #3392" },
              { name: "Sofía", time: "20:00 · Sáb", client: "VIP #1104" },
            ].map((r, i) => (
              <div
                key={i}
                className="border-l-2 border-gold/40 pl-4 py-2 hover:border-gold transition-colors"
              >
                <p className="text-white/90">{r.name}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">
                  {r.time} · {r.client}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}