import { useEffect, useRef } from "react";
import { location } from "@/data/companions";

export function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    let map: any;
    let cancelled = false;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        center: [location.lat, location.lng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 },
      ).addTo(map);

      const goldIcon = L.divIcon({
        className: "",
        iconSize: [22, 22],
        html: `<div style="width:22px;height:22px;border-radius:9999px;background:radial-gradient(circle,#C5A059 30%,rgba(197,160,89,0.15) 70%);box-shadow:0 0 20px #C5A05988;border:2px solid #C5A059;"></div>`,
      });
      L.marker([location.lat, location.lng], { icon: goldIcon }).addTo(map);
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[420px] bg-secondary/40 border border-white/5"
      aria-label="Mapa de ubicación"
    />
  );
}

export default MapView;