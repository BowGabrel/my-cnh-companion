import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, QrCode, CheckCircle2, X } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/app-header";
import { fines } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pagamentos")({
  head: () => ({
    meta: [
      { title: "Pagamentos — Carteira do Motorista" },
      { name: "description", content: "Pague suas multas via PIX ou cartão." },
    ],
  }),
  component: PaymentsPage,
});

type Step = "list" | "method" | "confirm";

function PaymentsPage() {
  const open = fines.filter((f) => f.status === "Em aberto");
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("list");
  const [method, setMethod] = useState<"pix" | "card">("pix");

  const fine = open.find((f) => f.id === selected);

  const startPayment = (id: string) => {
    setSelected(id);
    setStep("method");
  };
  const close = () => {
    setSelected(null);
    setStep("list");
  };

  return (
    <AppShell>
      <AppHeader title="Pagamentos" subtitle={`${open.length} multa(s) pagáveis`} showBack />

      <main className="px-5 pt-4 space-y-3">
        {open.length === 0 && (
          <div className="text-center py-16 text-sm text-muted-foreground">
            Você não possui multas em aberto.
          </div>
        )}
        {open.map((f) => (
          <article key={f.id} className="rounded-2xl bg-surface p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{f.description}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{f.date} • {f.plate}</p>
              </div>
              <p className="text-base font-bold text-warning shrink-0">R$ {f.amount.toFixed(2)}</p>
            </div>
            <button
              onClick={() => startPayment(f.id)}
              className="mt-3 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
            >
              Pagar agora
            </button>
          </article>
        ))}
      </main>

      {/* Modal */}
      {fine && step !== "list" && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-surface-elevated p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold">
                {step === "method" ? "Escolha o pagamento" : "Pagamento confirmado"}
              </h3>
              <button onClick={close} className="h-8 w-8 rounded-full bg-surface flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>

            {step === "method" && (
              <>
                <div className="rounded-2xl bg-surface p-4 mb-4">
                  <p className="text-xs text-muted-foreground">{fine.description}</p>
                  <p className="text-2xl font-bold mt-1">R$ {fine.amount.toFixed(2)}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => setMethod("pix")}
                    className={cn(
                      "rounded-2xl p-4 border flex flex-col items-center gap-2 transition",
                      method === "pix" ? "border-primary bg-primary/10" : "border-border bg-surface",
                    )}
                  >
                    <QrCode className="h-6 w-6" />
                    <span className="text-sm font-semibold">PIX</span>
                  </button>
                  <button
                    onClick={() => setMethod("card")}
                    className={cn(
                      "rounded-2xl p-4 border flex flex-col items-center gap-2 transition",
                      method === "card" ? "border-primary bg-primary/10" : "border-border bg-surface",
                    )}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span className="text-sm font-semibold">Cartão</span>
                  </button>
                </div>

                <button
                  onClick={() => setStep("confirm")}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
                >
                  Confirmar pagamento
                </button>
              </>
            )}

            {step === "confirm" && (
              <div className="text-center py-4">
                <div className="mx-auto h-16 w-16 rounded-full bg-success/15 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-9 w-9 text-success" />
                </div>
                <p className="text-lg font-semibold">Pagamento realizado!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  R$ {fine.amount.toFixed(2)} via {method === "pix" ? "PIX" : "Cartão"}
                </p>
                <button
                  onClick={close}
                  className="mt-6 w-full rounded-xl bg-surface py-3 text-sm font-semibold hover:bg-background transition"
                >
                  Concluir
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
