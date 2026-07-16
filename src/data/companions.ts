import companion1 from "@/assets/companion-1.jpg";
import companion2 from "@/assets/companion-2.jpg";
import companion3 from "@/assets/companion-3.jpg";

export type Companion = {
  id: string;
  name: string;
  age: number;
  height: string;
  city: string;
  tag: string;
  hourly: number;
  image: string;
  available: boolean;
  languages: string[];
  bio: string;
};

export const companions: Companion[] = [
  {
    id: "elena",
    name: "Elena",
    age: 24,
    height: "1.72m",
    city: "Madrid · Salamanca",
    tag: "Featured",
    hourly: 450,
    image: companion1,
    available: true,
    languages: ["Español", "Inglés", "Francés"],
    bio: "Modelo internacional con una elegancia sobria y conversación fascinante.",
  },
  {
    id: "sofia",
    name: "Sofía",
    age: 27,
    height: "1.68m",
    city: "Barcelona · Eixample",
    tag: "Travel Ready",
    hourly: 600,
    image: companion2,
    available: false,
    languages: ["Español", "Italiano"],
    bio: "Refinada, cosmopolita y perfecta para eventos de alto perfil.",
  },
  {
    id: "isabella",
    name: "Isabella",
    age: 22,
    height: "1.75m",
    city: "Madrid · Chamberí",
    tag: "Nueva",
    hourly: 500,
    image: companion3,
    available: true,
    languages: ["Español", "Inglés"],
    bio: "Joven, cultivada, con una discreción y encanto excepcionales.",
  },
];

export const schedule = [
  { day: "Lunes — Jueves", hours: "16:00 — 03:00" },
  { day: "Viernes — Sábado", hours: "14:00 — 05:00" },
  { day: "Domingo", hours: "18:00 — 02:00" },
  { day: "Reservas privadas", hours: "24 horas · con cita previa" },
];

export const rates = [
  { label: "1 hora", price: "€450", note: "Encuentro estándar" },
  { label: "2 horas", price: "€800", note: "Cena y compañía" },
  { label: "Velada (4h)", price: "€1.400", note: "Incluye evento social" },
  { label: "Noche completa", price: "€2.800", note: "12 horas · privacidad total" },
];

export const location = {
  address: "Calle de Serrano 42, 28001 Madrid",
  lat: 40.4265,
  lng: -3.6883,
  phone: "+34 900 000 000",
  email: "reservas@lelite.agency",
};