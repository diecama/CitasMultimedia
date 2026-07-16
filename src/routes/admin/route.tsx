import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({
    meta: [
      { title: "Panel Admin — L'Élite" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      <main className="flex-1 min-w-0">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8">
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">
            Panel Administrativo
          </div>
          <div className="flex items-center gap-4">
            <span className="size-2 bg-emerald-400 rounded-full shadow-[0_0_10px] shadow-emerald-400/60" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
              Sistemas en línea
            </span>
            <div className="ml-6 size-8 rounded-full bg-gold/20 border border-gold/40 grid place-items-center text-gold text-xs font-semibold">
              A
            </div>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}