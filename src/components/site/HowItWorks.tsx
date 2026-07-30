const steps = [
  {
    n: "01",
    title: "Solicitud discreta",
    body: "Complete el formulario con su nombre y un medio de contacto. Nada más. Sin perfiles públicos, sin historial.",
  },
  {
    n: "02",
    title: "Confirmación privada",
    body: "Le contactamos de forma discreta en menos de una hora para afinar los detalles y verificar la disponibilidad.",
  },
  {
    n: "03",
    title: "El encuentro",
    body: "La dirección exacta y los códigos de acceso se comparten únicamente una vez confirmada la reserva. Discreción absoluta.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="border-t border-white/5 bg-gradient-to-b from-secondary/30 to-background py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20" data-scroll-reveal>
          <span className="text-gold text-[11px] uppercase tracking-[0.3em]">— El proceso</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 tracking-tighter">
            Cómo <span className="italic text-gold">funciona</span>.
          </h2>
          <div className="h-px w-24 bg-gold/50 mt-6 mx-auto" />
          <p className="text-white/50 max-w-lg mx-auto mt-6 text-sm leading-relaxed">
            Un proceso pensado para proteger su privacidad en cada paso. Tres etapas, cero fricción,
            discreción absoluta.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
          {steps.map((s) => (
            <article
              key={s.n}
              data-scroll-reveal
              className="group relative border-t border-white/10 pt-8 transition-colors duration-500 hover:border-gold/40"
            >
              <span className="font-display italic text-6xl text-gold/30 transition-colors duration-500 group-hover:text-gold/60 block mb-6 leading-none">
                {s.n}
              </span>
              <h3 className="font-display text-2xl mb-4 tracking-tight">{s.title}</h3>
              <p className="text-white/50 leading-relaxed text-[15px]">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
