import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, CreditCard, Bell, History, ChevronRight, LogOut, Settings, HelpCircle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/app-header";
import { user } from "@/lib/mock-data";

export const Route = createFileRoute("/mais")({
  head: () => ({
    meta: [
      { title: "Mais opções — Carteira do Motorista" },
      { name: "description", content: "Pontuação, pagamentos, notificações, histórico e configurações." },
    ],
  }),
  component: MorePage,
});

const sections = [
  {
    title: "Funcionalidades",
    items: [
      { to: "/pontuacao", label: "Pontuação da CNH", icon: TrendingUp },
      { to: "/pagamentos", label: "Pagamentos", icon: CreditCard },
      { to: "/notificacoes", label: "Notificações", icon: Bell },
      { to: "/historico", label: "Histórico e transparência", icon: History },
    ],
  },
] as const;

function MorePage() {
  return (
    <AppShell>
      <AppHeader title="Mais" subtitle="Configurações e atalhos" />

      <main className="px-5 pt-4 space-y-5">
        {/* Profile */}
        <div className="rounded-2xl bg-surface p-4 flex items-center gap-3">
          <img src={user.avatar} alt="" className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/40" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground">CPF {user.cpf}</p>
          </div>
        </div>

        {sections.map((sec) => (
          <section key={sec.title}>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 px-1">{sec.title}</h2>
            <div className="rounded-2xl bg-surface divide-y divide-border overflow-hidden">
              {sec.items.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-3 p-4 hover:bg-surface-elevated transition"
                >
                  <span className="h-9 w-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-sm font-medium">{label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 px-1">Conta</h2>
          <div className="rounded-2xl bg-surface divide-y divide-border overflow-hidden">
            {[
              { label: "Configurações", icon: Settings },
              { label: "Ajuda e suporte", icon: HelpCircle },
              { label: "Sair", icon: LogOut, danger: true },
            ].map(({ label, icon: Icon, danger }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 p-4 hover:bg-surface-elevated transition text-left"
              >
                <span className={`h-9 w-9 rounded-xl flex items-center justify-center ${danger ? "bg-destructive/15 text-destructive" : "bg-muted text-foreground"}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className={`flex-1 text-sm font-medium ${danger ? "text-destructive" : ""}`}>{label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>

        <p className="text-center text-[11px] text-muted-foreground pt-4">
          Carteira do Motorista • v1.0.0
        </p>
      </main>
    </AppShell>
  );
}
