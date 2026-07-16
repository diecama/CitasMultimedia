import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/bookings")({
  component: BookingsAdmin,
});

const bookings = [
  { id: "B-4821", client: "VIP #4821", companion: "Elena", date: "Hoy · 22:00", duration: "2h", status: "Confirmada" },
  { id: "B-4820", client: "VIP #3392", companion: "Isabella", date: "Mañana · 01:30", duration: "Velada", status: "Pendiente" },
  { id: "B-4819", client: "VIP #1104", companion: "Sofía", date: "Sáb · 20:00", duration: "Noche", status: "Confirmada" },
  { id: "B-4818", client: "VIP #2210", companion: "Elena", date: "Dom · 23:00", duration: "1h", status: "Cancelada" },
];

const statusColor: Record<string, string> = {
  Confirmada: "text-emerald-400 border-emerald-400/30",
  Pendiente: "text-gold border-gold/30",
  Cancelada: "text-red-400/70 border-red-400/30",
};

function BookingsAdmin() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl tracking-tighter">Reservas</h1>
        <p className="text-white/50 mt-2 text-sm">
          Todas las solicitudes y reservas confirmadas.
        </p>
      </div>

      <div className="border border-white/5 bg-card/40 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.25em] text-white/40 bg-black/20">
              <th className="py-4 px-6 text-left font-medium">Ref.</th>
              <th className="py-4 px-6 text-left font-medium">Cliente</th>
              <th className="py-4 px-6 text-left font-medium">Acompañante</th>
              <th className="py-4 px-6 text-left font-medium">Fecha</th>
              <th className="py-4 px-6 text-left font-medium">Duración</th>
              <th className="py-4 px-6 text-left font-medium">Estado</th>
              <th className="py-4 px-6 text-right font-medium">Acción</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-5 px-6 font-mono text-white/60 text-xs">{b.id}</td>
                <td className="py-5 px-6 text-white/90">{b.client}</td>
                <td className="py-5 px-6 text-gold font-display italic">{b.companion}</td>
                <td className="py-5 px-6 text-white/70">{b.date}</td>
                <td className="py-5 px-6 text-white/70">{b.duration}</td>
                <td className="py-5 px-6">
                  <span
                    className={`inline-block border px-2 py-1 text-[10px] uppercase tracking-widest ${statusColor[b.status]}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="py-5 px-6 text-right">
                  <button className="text-[11px] uppercase tracking-[0.25em] text-white/50 hover:text-gold transition-colors">
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}