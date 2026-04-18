import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/app-header";
import { user, pointsHistory } from "@/lib/mock-data";

export const Route = createFileRoute("/pontuacao")({
  head: () => ({
    meta: [
      { title: "Pontuação da CNH — Carteira do Motorista" },
      { name: "description", content: "Pontos atuais e histórico de infrações." },
    ],
  }),
  component: PointsPage,
});

function PointsPage() {
  const { points, maxPoints } = user.cnh;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const pct = points / maxPoints;
  const offset = circumference * (1 - pct);

  return (
    <AppShell>
      <AppHeader title="Pontuação da CNH" subtitle="Acompanhe seus pontos" showBack />

      <main className="px-5 pt-4 space-y-6">
        {/* Gauge */}
        <div className="rounded-3xl bg-surface p-6 flex flex-col items-center">
          <div className="relative">
            <svg width="200" height="200" className="-rotate-90">
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="var(--muted)"
                strokeWidth="14"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="url(#gradPts)"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
              <defs>
                <linearGradient id="gradPts" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="oklch(0.72 0.17 160)" />
                  <stop offset="60%" stopColor="oklch(0.78 0.16 75)" />
                  <stop offset="100%" stopColor="oklch(0.65 0.22 22)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-5xl font-bold">{points}</p>
              <p className="text-xs text-muted-foreground">de {maxPoints} pontos</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-center text-muted-foreground max-w-xs">
            Sua CNH pode ser suspensa ao atingir <span className="font-semibold text-foreground">{maxPoints} pontos</span> em 12 meses.
          </p>
        </div>

        {/* History */}
        <section>
          <h2 className="text-sm font-semibold mb-3">Histórico de pontos</h2>
          <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border">
            {pointsHistory.map((p) => (
              <div key={p.id} className="relative">
                <span className="absolute -left-[18px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                <div className="rounded-2xl bg-surface p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{p.date}</p>
                    <span className="text-sm font-bold text-warning">+{p.points} pts</span>
                  </div>
                  <p className="text-sm font-medium mt-1">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
