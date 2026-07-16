import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { label: "Colección", href: "#coleccion" },
  { label: "Servicios", href: "#servicios" },
  { label: "Horarios", href: "#horarios" },
  { label: "Tarifas", href: "#tarifas" },
  { label: "Ubicación", href: "#ubicacion" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b transition-all duration-500 ${
        scrolled
          ? "border-white/5 bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-2xl italic tracking-tighter text-gold"
        >
          L'Élite
        </Link>
        <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.22em] font-medium text-white/60">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <Link
          to="/admin"
          className="text-[11px] uppercase tracking-[0.22em] text-gold border border-gold/40 px-5 py-2.5 hover:bg-gold hover:text-primary-foreground transition-all"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
}