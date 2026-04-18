import { createFileRoute, Link } from "@tanstack/react-router";
import { IdCard, Car, AlertTriangle, CreditCard, ChevronRight, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { user, fines, notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carteira do Motorista — Início" },
      { name: "description", content: "Dashboard com CNH digital, veículos, multas e pontuação." },
    ],
  }),
  component: Home,
});

const shortcuts = [
  { to: "/cnh", label: "CNH Digital", icon: IdCard, color: "text-primary" },
  { to: "/veiculos", label: "Veículos", icon: Car, color: "text-accent" },
  { to: "/multas", label: "Multas", icon: AlertTriangle, color: "text-warning" },
  { to: "/pagamentos", label: "Pagamentos", icon: CreditCard, color: "text-success" },
] as const;

function Home() {
  const open = fines.filter((f) => f.status === "Em aberto");
  const pct = (user.cnh.points / user.cnh.maxPoints) * 100;

  return (
    <AppShell>
      <AppHeader />

      <main className="px-5 pt-2 space-y-6">
        {/* Hero CNH summary */}
        <Link
          to="/cnh"
          className="block rounded-3xl p-5 relative overflow-hidden shadow-[var(--shadow-glow)]"
          style={{ background: "var(--gradient-cnh)" }}
        >
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-white/70">CNH Digital</span>
              <StatusBadge tone="success">{user.cnh.status}</StatusBadge>
            </div>
            <p className="mt-3 text-white text-lg font-semibold">{user.name}</p>
            <p className="text-white/80 text-sm">Categoria {user.cnh.category} • Validade {user.cnh.validUntil}</p>
            <div className="mt-4 flex items-center justify-between text-white/90 text-sm">
              <span>Toque para ver detalhes</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </Link>

        {/* Shortcuts */}
        <section>
          <h2 className="text-sm font-semibold mb-3">Acesso rápido</h2>
          <div className="grid grid-cols-4 gap-3">
            {shortcuts.map(({ to, label, icon: Icon, color }) => (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center gap-2 rounded-2xl bg-surface p-3 hover:bg-surface-elevated transition"
              >
                <span className={`h-10 w-10 rounded-xl bg-background flex items-center justify-center ${color}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[11px] text-center font-medium leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Points */}
        <Link to="/pontuacao" className="block rounded-2xl bg-surface p-5 hover:bg-surface-elevated transition">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Pontuação da CNH</p>
              <p className="text-2xl font-bold mt-0.5">
                {user.cnh.points}<span className="text-base text-muted-foreground font-medium">/{user.cnh.maxPoints} pts</span>
              </p>
            </div>
            <span className="h-10 w-10 rounded-full bg-warning/15 flex items-center justify-center text-warning">
              <TrendingUp className="h-5 w-5" />
            </span>
          </div>
          <div className="h-2 rounded-full bg-background overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-success via-warning to-destructive"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            Faltam {user.cnh.maxPoints - user.cnh.points} pontos para suspensão
          </p>
        </Link>

        {/* Open fines */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Multas em aberto</h2>
            <Link to="/multas" className="text-xs text-primary font-medium">Ver todas</Link>
          </div>
          <div className="space-y-2">
            {open.slice(0, 2).map((f) => (
              <Link
                key={f.id}
                to="/multas"
                className="block rounded-2xl bg-surface p-4 hover:bg-surface-elevated transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{f.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{f.location}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{f.date} • {f.plate}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-warning">R$ {f.amount.toFixed(2)}</p>
                    <p className="text-[10px] text-muted-foreground">{f.points} pts</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Notifications preview */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Notificações recentes</h2>
            <Link to="/notificacoes" className="text-xs text-primary font-medium">Ver todas</Link>
          </div>
          <div className="rounded-2xl bg-surface divide-y divide-border">
            {notifications.slice(0, 3).map((n) => (
              <div key={n.id} className="p-4 flex items-start gap-3">
                <span className={`h-2 w-2 rounded-full mt-2 ${n.unread ? "bg-primary" : "bg-muted"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{n.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{n.message}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
