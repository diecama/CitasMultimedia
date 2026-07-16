import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: undefined,
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

export function useGsapScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const sections = el.querySelectorAll<HTMLElement>("[data-scroll-reveal]");
        sections.forEach((section) => {
          gsap.from(section, {
            y: 60,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }, el);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, []);

  return ref;
}