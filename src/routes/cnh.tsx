import { createFileRoute } from "@tanstack/react-router";
import { Download, Share2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { user } from "@/lib/mock-data";

export const Route = createFileRoute("/cnh")({
  head: () => ({
    meta: [
      { title: "CNH Digital — Carteira do Motorista" },
      { name: "description", content: "Visualize sua CNH digital, situação, categoria e validade." },
    ],
  }),
  component: CnhPage,
});

function CnhPage() {
  const c = user.cnh;
  const tone = c.status === "Ativa" ? "success" : c.status === "Suspensa" ? "warning" : "destructive";

  return (
    <AppShell>
      <AppHeader title="CNH Digital" subtitle="Documento oficial" showBack />

      <main className="px-5 pt-4 space-y-5">
        {/* CNH card */}
        <div
          className="rounded-3xl p-5 relative overflow-hidden shadow-[var(--shadow-glow)]"
          style={{ background: "var(--gradient-cnh)" }}
        >
          <div className="absolute -top-16 -right-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-black/20 blur-2xl" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/70">República Federativa do Brasil</p>
              <p className="text-xs text-white/90 font-semibold">Carteira Nacional de Habilitação</p>
            </div>
            <ShieldCheck className="h-7 w-7 text-white/90" />
          </div>

          <div className="relative mt-5 flex gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-20 rounded-lg object-cover ring-2 ring-white/30"
            />
            <div className="flex-1 min-w-0 text-white">
              <p className="text-[10px] uppercase text-white/60">Nome</p>
              <p className="text-sm font-bold leading-tight">{user.name}</p>

              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <p className="text-white/60 uppercase">CPF</p>
                  <p className="font-semibold">{user.cpf}</p>
                </div>
                <div>
                  <p className="text-white/60 uppercase">Categoria</p>
                  <p className="font-semibold">{c.category}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-4 grid grid-cols-3 gap-2 text-[11px] text-white">
            <div>
              <p className="text-white/60 uppercase">Registro</p>
              <p className="font-semibold">{c.register}</p>
            </div>
            <div>
              <p className="text-white/60 uppercase">Emissão</p>
              <p className="font-semibold">{c.issuedAt}</p>
            </div>
            <div>
              <p className="text-white/60 uppercase">Validade</p>
              <p className="font-semibold">{c.validUntil}</p>
            </div>
          </div>

          <div className="relative mt-4 flex items-center justify-between">
            <span className="text-[10px] text-white/70">Nº {c.number}</span>
            <StatusBadge tone={tone}>{c.status}</StatusBadge>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-surface py-3 text-sm font-medium hover:bg-surface-elevated transition">
            <Download className="h-4 w-4" /> Baixar PDF
          </button>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">
            <Share2 className="h-4 w-4" /> Compartilhar
          </button>
        </div>

        {/* Details */}
        <section className="rounded-2xl bg-surface p-5 space-y-3">
          <h2 className="text-sm font-semibold">Informações adicionais</h2>
          <Row label="Primeira habilitação" value={c.firstLicense} />
          <Row label="Pontuação atual" value={`${c.points} de ${c.maxPoints} pts`} />
          <Row label="Situação" value={c.status} />
        </section>

        <p className="text-[11px] text-muted-foreground text-center px-4">
          Este documento tem validade em todo território nacional conforme Lei nº 9.503/97.
        </p>
      </main>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
