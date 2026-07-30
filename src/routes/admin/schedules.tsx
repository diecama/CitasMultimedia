import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getSchedules } from "@/server/functions/settings";

export const Route = createFileRoute("/admin/schedules")({
  component: SchedulesAdmin,
});

function SchedulesAdmin() {
  const { data: schedulesData } = useSuspenseQuery({
    queryKey: ["schedules"],
    queryFn: () => getSchedules(),
  });

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-display text-4xl tracking-tighter">Horarios</h1>
        <p className="text-white/50 mt-2 text-sm">
          Configure la disponibilidad general de la agencia.
        </p>
      </div>
      <div className="border border-white/5 bg-card/40 divide-y divide-white/5">
        {schedulesData.map((s) => (
          <div key={s.id} className="grid grid-cols-2 gap-4 p-6 items-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/60">
              {s.day}
            </span>
            <input
              defaultValue={s.hours}
              className="bg-transparent border border-white/10 focus:border-gold/60 px-4 py-2 text-white/90 font-display italic outline-none transition-colors"
            />
          </div>
        ))}
      </div>
      <button className="bg-gold text-primary-foreground px-8 py-3 text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-gold-soft transition-colors">
        Guardar cambios
      </button>
    </div>
  );
}