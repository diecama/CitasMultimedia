import { Link, useRouterState } from "@tanstack/react-router";

const items = [
  { label: "Dashboard", to: "/admin" },
  { label: "Acompañantes", to: "/admin/companions" },
  { label: "Reservas", to: "/admin/bookings", badge: 3 },
  { label: "Horarios", to: "/admin/schedules" },
  { label: "Tarifas", to: "/admin/rates" },
  { label: "Ubicación", to: "/admin/location" },
] as const;

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="w-64 shrink-0 border-r border-white/5 bg-sidebar min-h-screen sticky top-0 flex flex-col">
      <div className="px-6 py-8 border-b border-white/5">
        <Link to="/" className="font-display italic text-2xl text-gold tracking-tighter">
          L'Élite
        </Link>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-2">
          Panel privado
        </p>
      </div>
      <nav className="p-4 space-y-1 flex-1">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 px-3 mb-4">
          Menú
        </p>
        {items.map((it) => {
          const active =
            it.to === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(it.to);
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center justify-between px-3 py-2.5 text-sm rounded-sm transition-all ${
                active
                  ? "bg-gold/10 text-gold border-l-2 border-gold"
                  : "text-white/60 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
              }`}
            >
              <span>{it.label}</span>
              {"badge" in it && it.badge ? (
                <span className="text-[10px] bg-gold text-primary-foreground px-1.5 py-0.5 font-semibold">
                  {it.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/5">
        <Link
          to="/"
          className="block text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-gold transition-colors px-3 py-2"
        >
          ← Volver al sitio
        </Link>
      </div>
    </aside>
  );
}