import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal y privacidad — L'Élite" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Aviso legal, política de privacidad, términos y condiciones de uso del colectivo privado L'Élite." },
    ],
  }),
  component: Legal,
});

const sections = [
  {
    id: "aviso-legal",
    title: "Aviso legal",
    body: [
      "L'Élite es un colectivo privado destinado exclusivamente a personas mayores de 18 años. El acceso y uso de este sitio implica la aceptación de las presentes condiciones.",
      "Todo el contenido aquí publicado —textos, imágenes y diseño— es propiedad de L'Élite o se utiliza con autorización. Queda prohibida su reproducción total o parcial sin consentimiento expreso.",
      "L'Élite actúa como agencia de presentación y coordinación. Cualquier relación derivada de los encuentros se establece de forma libre y consensuada entre adultos, sin contraprestación de naturaleza sexual.",
    ],
  },
  {
    id: "privacidad",
    title: "Política de privacidad",
    body: [
      "Tratamos sus datos con la máxima discreción. La información facilitada a través del formulario de reserva (nombre, contacto, preferencias) se utiliza única y exclusivamente para gestionar y confirmar las solicitudes.",
      "No compartimos ni comercializamos sus datos con terceros. Conservamos la información el tiempo estrictamente necesario para la atención de la solicitud y, en su caso, la cumplimos con las obligaciones legales aplicables.",
      "Puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión y oposición escribiendo a reservas@lelite.agency.",
    ],
  },
  {
    id: "terminos",
    title: "Términos de uso",
    body: [
      "El uso de este sitio está reservado a mayores de 18 años. Al continuar, el usuario declara cumplir con dicho requisito y ser consciente de la naturaleza del contenido del portal.",
      "Las tarifas mostradas son orientativas y pueden variar según el perfil y las condiciones de cada reserva. La disponibilidad de las acompañantes se confirma al momento de la solicitud.",
      "L'Élite se reserva el derecho de rechazar solicitudes que no cumplan con las normas de comportamiento y discreción que definen al colectivo.",
    ],
  },
  {
    id: "discrecion",
    title: "Discreción",
    body: [
      "La discreción es un valor fundacional de L'Élite. La dirección exacta y los códigos de acceso a la residencia se comparten únicamente tras confirmar la reserva.",
      "Tanto las acompañantes como el personal de la agencia se comprometen a la más estricta confidencialidad sobre los datos e identidad de cada cliente.",
    ],
  },
];

function Legal() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Nav />
      <article className="max-w-3xl mx-auto px-6 pt-40 pb-32">
        <span className="text-gold text-[11px] uppercase tracking-[0.3em] mb-4 block">
          — Información legal
        </span>
        <h1 className="font-display text-5xl md:text-6xl tracking-tighter mb-4">
          Aviso legal <span className="italic text-gold">& privacidad</span>.
        </h1>
        <p className="text-white/60 max-w-xl mb-16">
          Documento de referencia sobre el uso de este portal, el tratamiento
          de datos y los compromisos de discreción de nuestro colectivo.
        </p>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-16 border-y border-white/5 py-6">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-[11px] uppercase tracking-[0.22em] text-white/50 hover:text-gold transition-colors"
            >
              {s.title}
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-32">
              <h2 className="font-display text-3xl tracking-tighter mb-5">
                {s.title}
              </h2>
              <div className="h-px w-16 bg-gold/40 mb-6" />
              <div className="space-y-4">
                {s.body.map((p, i) => (
                  <p key={i} className="text-white/60 leading-relaxed text-[15px]">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-white/5">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.3em] text-gold hover:text-gold-soft transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </article>
      <Footer />
    </div>
  );
}
