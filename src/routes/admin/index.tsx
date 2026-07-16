import { createFileRoute } from "@tanstack/react-router";
import { companions } from "@/data/companions";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

const stats = [
  { label: "Perfiles activos", value: "24", trend: "+3 este mes" },
  { label: "Visitas hoy", value: "1.240", trend: "+18%" },
  { label: "Reservas pendientes", value: "8", trend: "3 nuevas" },
  { label: "Ingresos (mes)", value: "€14.2k", trend: "+22%" },
];

function Dashboard() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl tracking-tighter">
          Buenas noches, <span className="italic text-gold">Admin</span>.
        </h1>
        <p className="text-white/50 mt-2 text-sm">
          Resumen del rendimiento de la agencia · {new Date().toLocaleDateString("es-ES", { dateStyle: "full" })}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
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
              Últimos 7 días
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
              {companions.map((c) => (
                <tr key={c.id} className="border-b border-white/5">
                  <td className="py-4 flex items-center gap-3">
                    <img
                      src={c.image}
                      alt=""
                      className="size-9 object-cover rounded-full grayscale"
                      loading="lazy"
                    />
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