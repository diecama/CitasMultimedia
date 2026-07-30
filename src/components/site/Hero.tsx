import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero-eyebrow]", { y: 20, opacity: 0, duration: 1 })
        .from("[data-hero-line]", { y: 80, opacity: 0, duration: 1.2, stagger: 0.12 }, "-=0.6")
        .from("[data-hero-body]", { y: 30, opacity: 0, duration: 1 }, "-=0.6")
        .from("[data-hero-cta]", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");

      const onMove = (e: MouseEvent) => {
        if (!imgRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to(imgRef.current, { x, y, duration: 1.5, ease: "power2.out" });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative h-screen flex items-center overflow-hidden">
      <div ref={imgRef} className="absolute inset-[-5%] opacity-45">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="ken-burns w-full h-full object-cover"
        />
      </div>
      {/* Film grain — sits above the photo, below the gradients/text */}
      <div className="grain-overlay" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      {/* Reinforced vignette for cinematic depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 w-full pt-20">
        <span
          data-hero-eyebrow
          className="inline-block text-gold text-[11px] uppercase tracking-[0.4em] mb-8"
        >
          — Agencia privada · Madrid
        </span>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter mb-10">
          <span data-hero-line className="block">
            Redefiniendo
          </span>
          <span data-hero-line className="block text-gold italic">
            la intimidad.
          </span>
        </h1>
        <p data-hero-body className="max-w-md text-white/60 text-lg leading-relaxed mb-12">
          Un colectivo curado de acompañantes sofisticadas para quienes valoran la discreción
          absoluta y la elegancia en cada detalle.
        </p>
        <div data-hero-cta className="flex items-center gap-6">
          <a
            href="#coleccion"
            className="group inline-flex items-center gap-4 border border-gold/40 pl-6 pr-2 py-2 text-[11px] uppercase tracking-[0.3em] text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-500"
          >
            Ver colección
            <span className="size-9 rounded-full border border-gold/40 grid place-items-center group-hover:bg-primary-foreground/10 transition-colors">
              →
            </span>
          </a>
          <span className="scroll-hint text-[10px] uppercase tracking-[0.3em] text-white/40">
            Scroll ↓
          </span>
        </div>
      </div>
    </section>
  );
}
