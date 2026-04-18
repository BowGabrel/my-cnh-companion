import { Link } from "@tanstack/react-router";
import { Home, IdCard, Car, AlertTriangle, MoreHorizontal } from "lucide-react";

const items = [
  { to: "/", label: "Início", icon: Home, exact: true },
  { to: "/cnh", label: "CNH", icon: IdCard, exact: false },
  { to: "/veiculos", label: "Veículos", icon: Car, exact: false },
  { to: "/multas", label: "Multas", icon: AlertTriangle, exact: false },
  { to: "/mais", label: "Mais", icon: MoreHorizontal, exact: false },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/85 backdrop-blur-xl">
      <ul className="grid grid-cols-5 px-2 py-2 max-w-md mx-auto">
        {items.map(({ to, label, icon: Icon, exact }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact }}
              className="flex flex-col items-center gap-1 py-1.5 text-muted-foreground transition-colors data-[status=active]:text-primary"
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
