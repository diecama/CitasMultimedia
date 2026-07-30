/**
 * Seed script — run once via `wrangler d1 execute` to populate the
 * initial admin user and all reference data.
 *
 * To apply:
 *   npx tsx src/server/db/seed.ts
 *
 * OR generate a SQL file and pipe it to D1:
 *   npx tsx src/server/db/seed.ts > seed.sql
 *   wrangler d1 execute citasmultimedia_db --file=seed.sql
 */

// ── Helpers (pure JS, safe for CF Workers / SQL) ──────────────────

function hashPassword(password: string) {
  // We pre-compute a PBKDF2 hash for the default admin user.
  // In production the first login should be CLI-generated.
  // For now, we let the app handle hashing at first-run via a server fn.
  // This seed stores a placeholder that triggers first-run setup.
  return "";
}

// ── Seed data ────────────────────────────────────────────────────

const companionsSeed = [
  {
    id: "elena",
    name: "Elena",
    age: 24,
    height: "1.72m",
    city: "Madrid · Salamanca",
    tag: "Featured",
    hourly: 450,
    images: '["companion-1.jpg","companion-2.jpg","companion-3.jpg","compania 21.jpg"]',
    available: 1,
    languages: '["Español","Inglés","Francés"]',
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
    images: '["companion-2.jpg","companion-3.jpg","companion-1.jpg"]',
    available: 0,
    languages: '["Español","Italiano"]',
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
    images: '["companion-3.jpg","compania 21.jpg","companion-1.jpg","companion-2.jpg"]',
    available: 1,
    languages: '["Español","Inglés"]',
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
    images: '["companion-3.jpg","companion-2.jpg","companion-1.jpg"]',
    available: 1,
    languages: '["Español","Inglés","Alemán"]',
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
    images: '["companion-1.jpg","companion-3.jpg","companion-2.jpg"]',
    available: 1,
    languages: '["Español","Inglés","Portugués"]',
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
    images: '["companion-2.jpg","companion-1.jpg","companion-3.jpg"]',
    available: 0,
    languages: '["Español","Inglés","Francés"]',
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
    images: '["companion-1.jpg","compania 21.jpg","companion-2.jpg","companion-3.jpg"]',
    available: 1,
    languages: '["Español","Inglés"]',
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
    images: '["companion-3.jpg","companion-1.jpg","companion-2.jpg"]',
    available: 1,
    languages: '["Español","Italiano","Inglés"]',
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
    images: '["companion-2.jpg","companion-3.jpg","companion-1.jpg"]',
    available: 1,
    languages: '["Español","Inglés","Francés"]',
    bio: "Especialista en costa y residencias privadas; calma mediterránea y detalle absoluto.",
  },
];

const schedulesSeed = [
  { day: "Lunes — Jueves", hours: "16:00 — 03:00", sortOrder: 1 },
  { day: "Viernes — Sábado", hours: "14:00 — 05:00", sortOrder: 2 },
  { day: "Domingo", hours: "18:00 — 02:00", sortOrder: 3 },
  { day: "Reservas privadas", hours: "24 horas · con cita previa", sortOrder: 4 },
];

const ratesSeed = [
  { label: "1 hora", price: "€450", note: "Encuentro estándar", sortOrder: 1 },
  { label: "2 horas", price: "€800", note: "Cena y compañía", sortOrder: 2 },
  { label: "Velada (4h)", price: "€1.400", note: "Incluye evento social", sortOrder: 3 },
  { label: "Noche completa", price: "€2.800", note: "12 horas · privacidad total", sortOrder: 4 },
];

const settingsSeed = [
  { key: "address", value: "Calle de Serrano 42, 28001 Madrid" },
  { key: "lat", value: "40.4265" },
  { key: "lng", value: "-3.6883" },
  { key: "phone", value: "+34 900 000 000" },
  { key: "email", value: "reservas@lelite.agency" },
];

const bookingsSeed = [
  { id: "B-4821", client: "VIP #4821", companionId: "elena", companionName: "Elena", date: "Hoy · 22:00", duration: "2h", status: "Confirmada" },
  { id: "B-4820", client: "VIP #3392", companionId: "isabella", companionName: "Isabella", date: "Mañana · 01:30", duration: "Velada", status: "Pendiente" },
  { id: "B-4819", client: "VIP #1104", companionId: "sofia", companionName: "Sofía", date: "Sáb · 20:00", duration: "Noche", status: "Confirmada" },
  { id: "B-4818", client: "VIP #2210", companionId: "elena", companionName: "Elena", date: "Dom · 23:00", duration: "1h", status: "Cancelada" },
];

// ── SQL generator ────────────────────────────────────────────────

function insertSQL(table: string, rows: Record<string, unknown>[]): string {
  if (!rows.length) return `-- ${table}: no rows`;
  const cols = Object.keys(rows[0]!);
  const values = rows
    .map((r) => {
      const vals = cols.map((c) => {
        const v = r[c];
        if (v === null || v === undefined) return "NULL";
        if (typeof v === "number") return String(v);
        // Escape single quotes for SQL
        return `'${String(v).replace(/'/g, "''")}'`;
      });
      return `(${vals.join(", ")})`;
    })
    .join(",\n");
  return `INSERT INTO "${table}" (${cols.map((c) => `"${c}"`).join(", ")})\nVALUES ${values};`;
}

// ── Main ─────────────────────────────────────────────────────────

function main() {
  const lines: string[] = [
    "-- ============================================",
    "--  L'Élite — Seed data",
    "--  Generated automatically from seed.ts",
    "-- ============================================",
    "",
    "--- Companions",
    insertSQL("companions", companionsSeed),
    "",
    "--- Schedules",
    insertSQL("schedules", schedulesSeed),
    "",
    "--- Rates",
    insertSQL("rates", ratesSeed),
    "",
    "--- Settings",
    insertSQL("settings", settingsSeed),
    "",
    "--- Bookings",
    insertSQL("bookings", bookingsSeed),
    "",
  ];

  // If running via stdout, print SQL for piping to wrangler
  if (process.stdout.isTTY) {
    console.log(
      "Seed SQL generated. Pipe to D1:\n" +
        "  npx tsx src/server/db/seed.ts | wrangler d1 execute citasmultimedia_db --remote --file=-",
    );
  } else {
    lines.forEach((l) => console.log(l));
  }
}

main();