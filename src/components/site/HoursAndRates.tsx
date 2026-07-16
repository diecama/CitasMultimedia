import { schedule, rates } from "@/data/companions";

export function HoursAndRates() {
  return (
    <section
      id="horarios"
      className="border-t border-white/5 bg-gradient-to-b from-background to-secondary/30 py-32 px-6"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
        {/* Horarios */}
        <div data-scroll-reveal>
          <span className="text-gold text-[11px] uppercase tracking-[0.3em]">
            — Disponibilidad
          </span>
          <h2 className="font-display text-5xl mt-4 mb-10 tracking-tighter">
            Horarios <span className="italic text-gold">privados</span>.
          </h2>
          <div className="divide-y divide-white/5 border-y border-white/5">
            {schedule.map((s) => (
              <div
                key={s.day}
                className="flex justify-between items-baseline py-5 group hover:pl-4 transition-all duration-500"
              >
                <span className="text-[11px] uppercase tracking-[0.25em] text-white/50 group-hover:text-gold transition-colors">
                  {s.day}
                </span>
                <span className="font-display text-xl text-white/90">
                  {s.hours}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-10 text-white/50 text-sm leading-relaxed max-w-md">
            Recomendamos reservar con al menos 4 horas de antelación. Para
            solicitudes urgentes, contáctenos directamente.
          </p>
        </div>

        {/* Tarifas */}
        <div id="tarifas" data-scroll-reveal>
          <span className="text-gold text-[11px] uppercase tracking-[0.3em]">
            — Tarifas
          </span>
          <h2 className="font-display text-5xl mt-4 mb-10 tracking-tighter">
            Experiencias <span className="italic text-gold">a medida</span>.
          </h2>
          <div className="grid gap-4">
            {rates.map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between border border-white/5 hover:border-gold/40 bg-card/40 backdrop-blur-sm px-6 py-6 transition-all duration-500 group"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-1">
                    {r.label}
                  </p>
                  <p className="text-white/80">{r.note}</p>
                </div>
                <span className="font-display text-3xl text-gold italic group-hover:scale-110 transition-transform duration-500 origin-right">
                  {r.price}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[10px] uppercase tracking-[0.25em] text-white/40">
            Tarifas orientativas · Cada perfil puede tener condiciones propias
          </p>
        </div>
      </div>
    </section>
  );
}