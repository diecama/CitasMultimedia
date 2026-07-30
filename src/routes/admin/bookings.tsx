import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBookings } from "@/server/functions/settings";

export const Route = createFileRoute("/admin/bookings")({
  component: BookingsAdmin,
});

const statusColor: Record<string, string> = {
  Confirmada: "text-emerald-400 border-emerald-400/30",
  Pendiente: "text-gold border-gold/30",
  Cancelada: "text-red-400/70 border-red-400/30",
};

function BookingsAdmin() {
  const { data: bookingsData } = useSuspenseQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookings(),
  });

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
            {bookingsData.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-[11px] uppercase tracking-[0.3em] text-white/30"
                >
                  No hay reservas registradas
                </td>
              </tr>
            )}
            {bookingsData.map((b) => (
              <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-5 px-6 font-mono text-white/60 text-xs">{b.id}</td>
                <td className="py-5 px-6 text-white/90">{b.client}</td>
                <td className="py-5 px-6 text-gold font-display italic">{b.companionName}</td>
                <td className="py-5 px-6 text-white/70">{b.date}</td>
                <td className="py-5 px-6 text-white/70">{b.duration}</td>
                <td className="py-5 px-6">
                  <span
                    className={`inline-block border px-2 py-1 text-[10px] uppercase tracking-widest ${statusColor[b.status] ?? "text-white/50 border-white/30"}`}
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