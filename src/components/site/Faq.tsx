import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "¿Cómo garantizan la discreción?",
    a: "La discreción es un valor fundacional de L'Élite. No creamos perfiles públicos vinculados a usted, no compartimos sus datos con terceros y la dirección exacta de la residencia se revela únicamente tras confirmar la reserva. Tanto las acompañantes como el personal firmamos compromisos de confidencialidad.",
  },
  {
    q: "¿Con cuánta antelación debo reservar?",
    a: "Recomendamos un mínimo de 4 horas. Para veladas, viajes o perfiles exclusivos es preferible anticipar con varios días. Aceptamos solicitudes urgentes y hacemos lo posible por atenderlas cuando la agenda lo permite.",
  },
  {
    q: "¿Qué formas de pago aceptan?",
    a: "Aceptamos transferencia, efectivo y los principales medios digitales. Los detalles concretos se confirman de forma privada al gestionar la reserva; nunca almacenamos datos de pago en el sitio.",
  },
  {
    q: "¿Pueden cancelarse o modificarse las reservas?",
    a: "Sí. Las cancelaciones o cambios con la antelación acordada no suponen coste. Las anulaciones de último minuto pueden tener penalización según las condiciones específicas de cada reserva, siempre comunicadas de antemano.",
  },
  {
    q: "¿Las acompañantes realizan viajes?",
    a: "Gran parte del colectivo está disponible para viajes y escapadas, dentro y fuera de España. Los perfiles marcados como «Viajeras» confirman disponibilidad inmediata para desplazamientos; el resto se confirma caso por caso.",
  },
  {
    q: "¿Es necesario aportar información personal sensible?",
    a: "No. Para gestionar la solicitud pedimos únicamente un nombre de contacto y un medio de comunicación. La verificación necesaria se hace con discreción y el mínimo imprescindible.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-white/5 py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16" data-scroll-reveal>
          <span className="text-gold text-[11px] uppercase tracking-[0.3em]">
            — Preguntas frecuentes
          </span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 tracking-tighter">
            Dudas <span className="italic text-gold">resueltas</span>.
          </h2>
          <div className="h-px w-24 bg-gold/50 mt-6 mx-auto" />
        </div>

        <AccordionPrimitive.Root
          type="single"
          collapsible
          className="border-y border-white/10"
          data-scroll-reveal
        >
          {faqs.map((f, i) => (
            <AccordionPrimitive.Item
              key={i}
              value={`item-${i}`}
              className="group border-b border-white/10 last:border-0"
            >
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="group/trigger flex w-full items-center justify-between gap-6 py-7 text-left cursor-pointer transition-colors hover:text-gold focus-visible:outline-none focus-visible:text-gold">
                  <span className="font-display text-xl md:text-2xl tracking-tight">{f.q}</span>
                  <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-gold/30 text-gold transition-all duration-300 group-data-[state=open]/trigger:rotate-45 group-data-[state=open]/trigger:border-gold/70 group-data-[state=open]/trigger:bg-gold/10">
                    <Plus className="size-4" />
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-8 pr-14 text-white/55 leading-relaxed text-[15px]">{f.a}</p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}
