import companion1 from "@/assets/companion-1.jpg";
import companion2 from "@/assets/companion-2.jpg";
import companion3 from "@/assets/companion-3.jpg";
import companion4 from "@/assets/compañia 21.jpg";

export type Companion = {
  id: string;
  name: string;
  age: number;
  height: string;
  city: string;
  tag: string;
  hourly: number;
  images: string[];
  available: boolean;
  languages: string[];
  bio: string;
};

// NOTE: only 3 real photos exist in src/assets. Each profile's `images` is a
// rotated gallery so every portfolio reads as a distinct multimedia set even
// though it draws from the same pool. Swap these for real per-profile photos
// when available (import companion-4.jpg, etc.).
export const companions: Companion[] = [
  {
    id: "elena",
    name: "Elena",
    age: 24,
    height: "1.72m",
    city: "Madrid · Salamanca",
    tag: "Featured",
    hourly: 450,
    images: [companion1, companion2, companion3, companion4],
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
    images: [companion2, companion3, companion1],
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
    images: [companion3, companion4, companion1, companion2],
    available: true,
    languages: ["Español", "Inglés"],
    bio: "Joven, cultivada, con una discreción y encanto excepcionales.",
  },
  {
    id: "valentina",
    name: "Valentina",
    age: 26,
    height: "1.70m",
    city: "Valencia · Eixample",
    tag: "Featured",
    hourly: 480,
    images: [companion3, companion2, companion1],
    available: true,
    languages: ["Español", "Inglés", "Alemán"],
    bio: "Artista plástica de trato delicado, ideal para cenas íntimas y escape total.",
  },
  {
    id: "camila",
    name: "Camila",
    age: 25,
    height: "1.74m",
    city: "Madrid · Retiro",
    tag: "Travel Ready",
    hourly: 550,
    images: [companion1, companion3, companion2],
    available: true,
    languages: ["Español", "Inglés", "Portugués"],
    bio: "Brillante y deportista; presencia magnética en escaparates y veladas de gala.",
  },
  {
    id: "lucia",
    name: "Lucía",
    age: 29,
    height: "1.66m",
    city: "Sevilla · Nervión",
    tag: "Exclusive",
    hourly: 650,
    images: [companion2, companion1, companion3],
    available: false,
    languages: ["Español", "Inglés", "Francés"],
    bio: "Matizada y serena; la opción definitiva para quien busca distinción sin filtros.",
  },
  {
    id: "ariana",
    name: "Ariana",
    age: 23,
    height: "1.73m",
    city: "Bilbao · Abando",
    tag: "Nueva",
    hourly: 420,
    images: [companion1, companion4, companion2, companion3],
    available: true,
    languages: ["Español", "Inglés"],
    bio: "Recién llegada, fresca y espontánea con una sonrisa que lo cambia todo.",
  },
  {
    id: "bianca",
    name: "Bianca",
    age: 28,
    height: "1.69m",
    city: "Madrid · Justicia",
    tag: "Travel Ready",
    hourly: 580,
    images: [companion3, companion1, companion2],
    available: true,
    languages: ["Español", "Italiano", "Inglés"],
    bio: "Ejecutiva por día, sofisticada por noche: compañía políglota para viajes.",
  },
  {
    id: "noelia",
    name: "Noelia",
    age: 26,
    height: "1.71m",
    city: "Málaga · Centro",
    tag: "Exclusive",
    hourly: 620,
    images: [companion2, companion3, companion1],
    available: true,
    languages: ["Español", "Inglés", "Francés"],
    bio: "Especialista en costa y residencias privadas; calma mediterránea y detalle absoluto.",
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
