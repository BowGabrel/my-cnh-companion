import { Link } from "@tanstack/react-router";
import { Bell, ArrowLeft } from "lucide-react";
import { user, notifications } from "@/lib/mock-data";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
}

export function AppHeader({ title, subtitle, showBack = false }: AppHeaderProps) {
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="px-5 py-4 flex items-center gap-3">
        {showBack ? (
          <Link
            to="/"
            className="h-10 w-10 rounded-full bg-surface flex items-center justify-center text-foreground hover:bg-surface-elevated transition"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        ) : (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/40"
          />
        )}

        <div className="flex-1 min-w-0">
          {title ? (
            <>
              <h1 className="text-base font-semibold leading-tight truncate">{title}</h1>
              {subtitle && (
                <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
              )}
            </>
          ) : (
            <>
              <p className="text-xs text-muted-foreground">Olá, motorista</p>
              <p className="text-sm font-semibold truncate">{user.firstName} 👋</p>
            </>
          )}
        </div>

        <Link
          to="/notificacoes"
          className="relative h-10 w-10 rounded-full bg-surface flex items-center justify-center hover:bg-surface-elevated transition"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 h-4 min-w-4 px-1 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
              {unread}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
