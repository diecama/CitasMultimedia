import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { label: "Colección", href: "#coleccion", id: "coleccion" },
  { label: "Cómo funciona", href: "#como-funciona", id: "como-funciona" },
  { label: "Servicios", href: "#servicios", id: "servicios" },
  { label: "Horarios", href: "#horarios", id: "horarios" },
  { label: "Tarifas", href: "#tarifas", id: "tarifas" },
  { label: "Ubicación", href: "#ubicacion", id: "ubicacion" },
  { label: "FAQ", href: "#faq", id: "faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the nav link whose section is in view. Only armed
  // when the target sections actually exist (i.e. on the home route).
  useEffect(() => {
    const sectionEls = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full border-b transition-all duration-500",
        scrolled
          ? "border-white/5 bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl italic tracking-tighter text-gold">
          L'Élite
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.22em] font-medium text-white/60">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "group relative py-1 transition-colors",
                active === l.id ? "text-gold" : "text-white/60 hover:text-white",
              )}
            >
              {l.label}
              <span
                className={cn(
                  "pointer-events-none absolute left-0 -bottom-0.5 h-px bg-gold transition-all duration-300",
                  active === l.id ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </a>
          ))}
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Abrir menú"
            className="lg:hidden text-white/70 hover:text-gold transition-colors -mr-2 p-2"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-white/10 bg-background">
            <SheetTitle className="sr-only">Navegación</SheetTitle>
            <div className="mt-2 mb-10">
              <span className="font-display italic text-2xl text-gold tracking-tighter">
                L'Élite
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-1">
                Agencia privada
              </p>
            </div>
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <SheetClose asChild key={l.href}>
                  <a
                    href={l.href}
                    className={cn(
                      "text-sm uppercase tracking-[0.22em] transition-colors py-3 border-b border-white/5",
                      active === l.id ? "text-gold" : "text-white/70 hover:text-gold",
                    )}
                  >
                    {l.label}
                  </a>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
