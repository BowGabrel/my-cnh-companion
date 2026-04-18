import { BottomNav } from "./bottom-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md mx-auto pb-24">{children}</div>
      <BottomNav />
    </div>
  );
}
