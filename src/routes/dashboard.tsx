import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { ProgramCard } from "@/components/ProgramCard";
import { Input } from "@/components/ui/input";
import { programs, categories, mockUser } from "@/lib/mockData";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — HealthyHub" },
      { name: "description", content: "Your personalized learning dashboard with recommended programs and progress tracking." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const matchesQ = p.title.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase());
      const matchesC = category === "All" || p.category === category;
      return matchesQ && matchesC;
    });
  }, [query, category]);

  const continueLearning = programs.filter((p) => p.enrolled && p.progress > 0 && p.progress < 100);
  const recommended = programs.filter((p) => !p.enrolled).slice(0, 3);
  const popular = [...programs].sort((a, b) => b.points - a.points).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 shadow-soft sm:p-10">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl text-primary-foreground">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" /> Welcome back, {mockUser.name.split(" ")[0]}
              </div>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">Ready to grow today?</h1>
              <p className="mt-2 text-primary-foreground/85">
                You're on a {mockUser.streak}-day streak. Keep going — small habits build big change.
              </p>
              {continueLearning[0] && (
                <Link
                  to="/program/$programId"
                  params={{ programId: continueLearning[0].id }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition hover:shadow-glow"
                >
                  Resume: {continueLearning[0].title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:gap-2">
              <Stat label="Points" value={mockUser.totalPoints.toLocaleString()} />
              <Stat label="Streak" value={`${mockUser.streak} days`} />
              <Stat label="Completed" value={mockUser.programsCompleted} />
            </div>
          </div>
        </section>

        {/* Search + filters */}
        <section className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programs, topics, categories..."
              className="h-12 rounded-full border-border bg-card pl-11"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === c
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Continue learning */}
        {continueLearning.length > 0 && query === "" && category === "All" && (
          <Section title="Continue Learning" subtitle="Pick up where you left off">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {continueLearning.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          </Section>
        )}

        {/* Recommended */}
        {query === "" && category === "All" && (
          <Section title="Recommended for You" subtitle="Curated based on your wellness goals" icon={<Sparkles className="h-5 w-5 text-primary" />}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          </Section>
        )}

        {/* Popular topics */}
        {query === "" && category === "All" && (
          <Section title="Popular Topics" subtitle="Trending among students this week" icon={<TrendingUp className="h-5 w-5 text-secondary" />}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          </Section>
        )}

        {/* All / filtered results */}
        {(query !== "" || category !== "All") && (
          <Section title={query ? `Results for "${query}"` : category} subtitle={`${filtered.length} program${filtered.length !== 1 ? "s" : ""}`}>
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
                No programs match your search.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => <ProgramCard key={p.id} program={p} />)}
              </div>
            )}
          </Section>
        )}

        {/* Browse all */}
        {query === "" && category === "All" && (
          <Section title="All Programs" subtitle="Explore the full library">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          </Section>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white/15 px-4 py-3 text-primary-foreground backdrop-blur-sm">
      <div className="text-xs text-primary-foreground/75">{label}</div>
      <div className="font-display text-xl font-bold">{value}</div>
    </div>
  );
}

function Section({ title, subtitle, icon, children }: { title: string; subtitle?: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
            {icon}{title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
