import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, IdCard, TrendingUp, Car } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/app-header";
import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/notificacoes")({
  head: () => ({
    meta: [
      { title: "Notificações — Carteira do Motorista" },
      { name: "description", content: "Alertas sobre multas, CNH, pontos e veículos." },
    ],
  }),
  component: NotificationsPage,
});

const config = {
  fine: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/15" },
  cnh: { icon: IdCard, color: "text-primary", bg: "bg-primary/15" },
  points: { icon: TrendingUp, color: "text-destructive", bg: "bg-destructive/15" },
  status: { icon: Car, color: "text-accent", bg: "bg-accent/15" },
} as const;

function NotificationsPage() {
  return (
    <AppShell>
      <AppHeader title="Notificações" subtitle={`${notifications.filter(n => n.unread).length} não lidas`} showBack />

      <main className="px-5 pt-4 space-y-2">
        {notifications.map((n) => {
          const c = config[n.type];
          const Icon = c.icon;
          return (
            <article
              key={n.id}
              className={`rounded-2xl p-4 flex gap-3 ${n.unread ? "bg-surface-elevated" : "bg-surface"}`}
            >
              <span className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${c.bg} ${c.color}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{n.title}</p>
                  {n.unread && <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-[10px] text-muted-foreground mt-2">{n.time}</p>
              </div>
            </article>
          );
        })}
      </main>
    </AppShell>
  );
}
