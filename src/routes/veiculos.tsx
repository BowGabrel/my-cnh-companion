import { createFileRoute } from "@tanstack/react-router";
import { Car, Plus, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { vehicles } from "@/lib/mock-data";

export const Route = createFileRoute("/veiculos")({
  head: () => ({
    meta: [
      { title: "Veículos — Carteira do Motorista" },
      { name: "description", content: "Veículos vinculados ao motorista, situação e débitos." },
    ],
  }),
  component: VehiclesPage,
});

function VehiclesPage() {
  return (
    <AppShell>
      <AppHeader title="Meus veículos" subtitle={`${vehicles.length} vinculados`} showBack />

      <main className="px-5 pt-4 space-y-4">
        <button className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-3 text-sm text-muted-foreground hover:bg-surface transition">
          <Plus className="h-4 w-4" /> Vincular novo veículo
        </button>

        <div className="space-y-3">
          {vehicles.map((v) => {
            const tone =
              v.status === "Regular" ? "success" : v.status === "Pendente" ? "warning" : "destructive";
            return (
              <article key={v.id} className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-card)]">
                <div className="flex items-start gap-3">
                  <span className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                    <Car className="h-6 w-6" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold truncate">{v.model}</p>
                      <StatusBadge tone={tone}>{v.status}</StatusBadge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {v.year} • {v.color}
                    </p>
                    <div className="mt-2 inline-flex items-center font-mono text-sm font-bold tracking-wider px-2.5 py-1 rounded-md bg-background border border-border">
                      {v.plate}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-[11px] text-muted-foreground">Débitos</p>
                    <p className={`text-sm font-semibold ${v.debts > 0 ? "text-warning" : "text-success"}`}>
                      {v.debts > 0 ? `${v.debts} pendente(s)` : "Nenhum"}
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-xl bg-primary/15 text-primary px-3 py-2 text-xs font-semibold hover:bg-primary/25 transition">
                    <Search className="h-3.5 w-3.5" /> Consultar débitos
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </AppShell>
  );
}
