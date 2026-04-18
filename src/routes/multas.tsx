import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Calendar, CreditCard } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { fines, type FineStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/multas")({
  head: () => ({
    meta: [
      { title: "Multas e Infrações — Carteira do Motorista" },
      { name: "description", content: "Acompanhe suas multas em aberto, pagas e em recurso." },
    ],
  }),
  component: FinesPage,
});

const tabs: FineStatus[] = ["Em aberto", "Pago", "Em recurso"];

function FinesPage() {
  const [active, setActive] = useState<FineStatus>("Em aberto");
  const filtered = fines.filter((f) => f.status === active);
  const total = filtered.reduce((s, f) => s + f.amount, 0);

  return (
    <AppShell>
      <AppHeader title="Multas e infrações" subtitle={`${fines.length} no total`} showBack />

      <main className="px-5 pt-4 space-y-4">
        {/* Tabs */}
        <div className="flex gap-2 p-1 rounded-2xl bg-surface">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-semibold transition",
                active === t
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="rounded-2xl bg-surface p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-muted-foreground uppercase">Total</p>
            <p className="text-xl font-bold">R$ {total.toFixed(2)}</p>
          </div>
          <p className="text-xs text-muted-foreground">{filtered.length} registro(s)</p>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-sm text-muted-foreground">Nenhuma multa nesta categoria.</div>
          ) : (
            filtered.map((f) => {
              const tone =
                f.status === "Em aberto" ? "warning" : f.status === "Pago" ? "success" : "info";
              return (
                <article key={f.id} className="rounded-2xl bg-surface p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm leading-snug">{f.description}</p>
                    <StatusBadge tone={tone}>{f.status}</StatusBadge>
                  </div>

                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" /> {f.date}
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                      <span className="truncate">{f.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <div className="flex gap-4">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Valor</p>
                        <p className="text-sm font-bold">R$ {f.amount.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Pontos</p>
                        <p className="text-sm font-bold text-warning">{f.points}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Placa</p>
                        <p className="text-sm font-mono font-bold">{f.plate}</p>
                      </div>
                    </div>
                    {f.status === "Em aberto" && (
                      <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-3 py-2 text-xs font-semibold hover:bg-primary/90 transition">
                        <CreditCard className="h-3.5 w-3.5" /> Pagar
                      </button>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </main>
    </AppShell>
  );
}
