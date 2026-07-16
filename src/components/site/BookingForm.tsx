export function BookingForm() {
  return (
    <section
      id="servicios"
      className="border-t border-white/5 bg-gradient-to-b from-secondary/30 to-background py-32 px-6"
    >
      <div className="max-w-4xl mx-auto text-center mb-16" data-scroll-reveal>
        <span className="text-gold text-[11px] uppercase tracking-[0.3em]">
          — Reserva Privada
        </span>
        <h2 className="font-display text-5xl md:text-6xl mt-4 mb-6 tracking-tighter">
          Una velada <span className="italic text-gold">inolvidable</span>.
        </h2>
        <p className="text-white/60 max-w-xl mx-auto">
          Complete el formulario y le contactaremos en menos de una hora con la
          confirmación y detalles.
        </p>
      </div>

      <form
        className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6"
        onSubmit={(e) => e.preventDefault()}
        data-scroll-reveal
      >
        <Input label="Nombre" placeholder="Sr. / Sra." />
        <Input label="Contacto" placeholder="Teléfono o email" />
        <Input label="Fecha preferida" type="date" />
        <Input label="Duración" placeholder="1 hora / velada / noche" />
        <div className="md:col-span-2">
          <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2 block">
            Comentarios
          </label>
          <textarea
            rows={4}
            placeholder="Preferencias, evento, ubicación..."
            className="w-full bg-transparent border border-white/10 focus:border-gold/60 outline-none px-4 py-3 text-white/90 transition-colors"
          />
        </div>
        <button
          type="submit"
          className="md:col-span-2 mt-4 py-5 bg-gold text-primary-foreground text-[11px] uppercase font-semibold tracking-[0.3em] hover:bg-gold-soft transition-colors"
        >
          Solicitar reserva discreta
        </button>
      </form>
    </section>
  );
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2 block">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-transparent border border-white/10 focus:border-gold/60 outline-none px-4 py-3 text-white/90 transition-colors"
      />
    </div>
  );
}