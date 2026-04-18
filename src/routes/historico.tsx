import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eye } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { fines, accessLog } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/historico")({
  head: () => ({
    meta: [
      { title: "Histórico — Carteira do Motorista" },
      { name: "description", content: "Histórico de infrações, pagamentos e log de acessos aos seus dados." },
    ],
  }),
  component: HistoryPage,
});

const tabs = ["Infrações", "Pagamentos", "Acessos"] as const;
type Tab = (typeof tabs)[number];

function HistoryPage() {
  const [tab, setTab] = useState<Tab>("Infrações");
  const paid = fines.filter((f) => f.status === "Pago");

  return (
    <AppShell>
      <AppHeader title="Histórico" subtitle="Transparência total" showBack />

      <main className="px-5 pt-4 space-y-4">
        <div className="flex gap-2 p-1 rounded-2xl bg-surface">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-semibold transition",
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Infrações" && (
          <div className="space-y-2">
            {fines.map((f) => (
              <div key={f.id} className="rounded-2xl bg-surface p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{f.description}</p>
                    <p className="text-xs text-muted-foreground">{f.date} • {f.plate}</p>
                  </div>
                  <StatusBadge
                    tone={f.status === "Pago" ? "success" : f.status === "Em aberto" ? "warning" : "info"}
                  >
                    {f.status}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Pagamentos" && (
          <div className="space-y-2">
            {paid.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">Nenhum pagamento registrado.</p>
            )}
            {paid.map((f) => (
              <div key={f.id} className="rounded-2xl bg-surface p-4 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{f.description}</p>
                  <p className="text-xs text-muted-foreground">{f.date}</p>
                </div>
                <p className="text-sm font-bold text-success shrink-0">R$ {f.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "Acessos" && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground px-1">
              Veja quem consultou seus dados e quando.
            </p>
            {accessLog.map((a) => (
              <div key={a.id} className="rounded-2xl bg-surface p-4 flex items-start gap-3">
                <span className="h-9 w-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <Eye className="h-4 w-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{a.entity}</p>
                  <p className="text-xs text-muted-foreground">{a.action}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </AppShell>
  );
}
