import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { companions } from "@/data/companions";
import { ProfileGallery } from "@/components/site/ProfileGallery";
import { cn } from "@/lib/utils";

type Filter = "Todas" | "Nuevas" | "Viajeras" | "Exclusivas";

const filters: Filter[] = ["Todas", "Nuevas", "Viajeras", "Exclusivas"];

function matches(filter: Filter, tag: string) {
  switch (filter) {
    case "Nuevas":
      return tag === "Nueva";
    case "Viajeras":
      return tag === "Travel Ready";
    case "Exclusivas":
      return tag === "Featured" || tag === "Exclusive";
    default:
      return true;
  }
}

export function Catalog() {
  const rootRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("Todas");

  useEffect(() => {
    if (!rootRef.current) return;
    let ctx: gsap.Context | undefined;
    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from("[data-catalog-title]", {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        });
        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card, i) => {
          gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: card, start: "top 85%" },
          });
        });
      }, rootRef);
    })();
    return () => ctx?.revert();
  }, []);

  const visible = companions.filter((c) => matches(filter, c.tag));

  return (
    <section id="coleccion" ref={rootRef} className="py-32 px-6 max-w-7xl mx-auto">
      <div
        data-catalog-title
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6"
      >
        <div>
          <span className="text-gold text-[11px] uppercase tracking-[0.3em] mb-4 block">
            — La Colección
          </span>
          <h2 className="font-display text-5xl md:text-6xl tracking-tighter">
            Perfiles seleccionados.
          </h2>
          <div className="h-px w-24 bg-gold/50 mt-6" />
        </div>
        <div className="flex gap-6 text-[11px] uppercase tracking-widest">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              data-elite-control
              className={cn(
                "transition-colors",
                filter === f ? "text-gold" : "text-white/40 hover:text-white/80",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-white/40 text-sm uppercase tracking-[0.22em] py-20 text-center">
          No hay perfiles en esta selección.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {visible.map((c, i) => (
            <article
              key={c.id}
              data-card
              className={cn(
                "group cursor-pointer transition-transform duration-500",
                i % 3 === 1 ? "md:translate-y-16" : "",
              )}
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6 ring-1 ring-transparent transition-all duration-500 group-hover:ring-gold/30 group-hover:shadow-[0_20px_60px_-15px] group-hover:shadow-black/60">
                <ProfileGallery images={c.images} alt={c.name} className="size-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-70 pointer-events-none" />
                <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      c.available
                        ? "bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400/60"
                        : "bg-white/30",
                    )}
                  />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/80">
                    {c.available ? "Disponible" : "Ocupada"}
                  </span>
                </div>
                <div className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.25em] text-gold border border-gold/40 px-2 py-1 pointer-events-none">
                  {c.tag}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-full py-4 bg-gold text-primary-foreground text-[11px] uppercase font-semibold tracking-[0.25em] hover:bg-gold-soft transition-colors">
                    Ver portafolio
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display text-3xl mb-1 transition-colors duration-500 group-hover:text-gold">
                    {c.name}
                  </h3>
                  <p className="text-white/40 text-[11px] uppercase tracking-[0.22em]">
                    {c.age} años · {c.height} · {c.city}
                  </p>
                </div>
                <span className="text-gold font-display italic text-2xl">
                  €{c.hourly}
                  <span className="text-[10px] uppercase tracking-widest text-white/40 not-italic ml-1">
                    /h
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
