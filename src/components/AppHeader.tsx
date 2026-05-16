import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Sparkles, Trophy, User, LogOut, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockUser } from "@/lib/mockData";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/achievements", label: "Achievements" },
  { to: "/profile", label: "Profile" },
] as const;

export function AppHeader() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-soft">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">
            Healthy<span className="text-primary">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 rounded-full bg-warning/15 px-3 py-1.5 text-sm font-semibold text-warning-foreground sm:flex">
            <Flame className="h-4 w-4 text-orange-500" />
            {mockUser.streak}
          </div>
          <div className="hidden items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1.5 text-sm font-semibold text-accent-foreground sm:flex">
            <Trophy className="h-4 w-4" />
            {mockUser.totalPoints.toLocaleString()}
          </div>
          <Link to="/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-hero text-sm font-bold text-primary-foreground shadow-soft">
            {mockUser.avatar}
          </Link>
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/" })} title="Sign out">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
