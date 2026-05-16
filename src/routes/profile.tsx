import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Flame, Trophy, BookOpen, CheckCircle2, Settings } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockUser, programs, achievements } from "@/lib/mockData";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — HealthyHub" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const enrolled = programs.filter((p) => p.enrolled);
  const completedLessons = enrolled.reduce((sum, p) => sum + Math.floor((p.progress / 100) * p.lessons.length), 0);
  const earned = achievements.filter((a) => a.earned);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile header */}
        <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="h-32 bg-gradient-hero" />
          <div className="px-6 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-card bg-gradient-hero font-display text-3xl font-bold text-primary-foreground shadow-soft">
                  {mockUser.avatar}
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold">{mockUser.name}</h1>
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" /> {mockUser.email}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                    <Trophy className="h-3 w-3" /> {mockUser.level}
                  </div>
                </div>
              </div>
              <Button variant="outline" className="rounded-xl">
                <Settings className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat icon={<Trophy className="h-5 w-5 text-warning-foreground" />} label="Total Points" value={mockUser.totalPoints.toLocaleString()} bg="bg-warning/15" />
              <Stat icon={<Flame className="h-5 w-5 text-orange-500" />} label="Day Streak" value={mockUser.streak} bg="bg-orange-500/10" />
              <Stat icon={<CheckCircle2 className="h-5 w-5 text-success" />} label="Lessons Done" value={completedLessons} bg="bg-success/15" />
              <Stat icon={<BookOpen className="h-5 w-5 text-secondary" />} label="Enrolled" value={enrolled.length} bg="bg-secondary/15" />
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Enrolled programs */}
          <section>
            <h2 className="mb-4 font-display text-xl font-bold">My Programs</h2>
            <div className="space-y-3">
              {enrolled.map((p) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.id}
                    to="/program/$programId"
                    params={{ programId: p.id }}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/50 hover:shadow-soft"
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate font-semibold">{p.title}</h3>
                        <span className="shrink-0 text-sm font-bold text-primary">{p.progress}%</span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{p.category} · {p.lessons.length} lessons</div>
                      <Progress value={p.progress} className="mt-2 h-1.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Recent achievements */}
          <aside>
            <h2 className="mb-4 font-display text-xl font-bold">Recent Badges</h2>
            <div className="space-y-3">
              {earned.slice(0, 4).map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                  <div className="text-3xl">{a.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-sm">{a.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{a.description}</div>
                  </div>
                </div>
              ))}
              <Link to="/achievements">
                <Button variant="outline" className="mt-2 w-full rounded-xl">View all achievements</Button>
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Stat({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: string | number; bg: string }) {
  return (
    <div className={`rounded-2xl ${bg} p-4`}>
      <div className="mb-1">{icon}</div>
      <div className="font-display text-xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
