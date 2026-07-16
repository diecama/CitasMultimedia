export function Footer() {
  return (
    <footer className="py-16 border-t border-white/5 text-center px-6">
      <span className="font-display text-3xl tracking-tighter text-gold italic mb-6 block">
        L'Élite
      </span>
      <div className="flex flex-wrap justify-center gap-8 text-[11px] uppercase tracking-[0.25em] text-white/40 mb-8">
        <a href="#" className="hover:text-gold transition-colors">Términos</a>
        <a href="#" className="hover:text-gold transition-colors">Privacidad</a>
        <a href="#" className="hover:text-gold transition-colors">Aviso legal</a>
        <a href="#" className="hover:text-gold transition-colors">Discreción</a>
      </div>
      <div className="inline-block border border-red-900/40 text-red-400/70 text-[10px] uppercase tracking-[0.4em] px-4 py-2 mb-6">
        Solo adultos +18
      </div>
      <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
        © 2026 L'Élite Private Collective
      </p>
    </footer>
  );
}