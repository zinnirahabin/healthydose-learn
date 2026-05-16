import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Lock, Download, Award } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { achievements, programs, mockUser } from "@/lib/mockData";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [{ title: "Achievements — HealthyHub" }],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const earned = achievements.filter((a) => a.earned);
  const locked = achievements.filter((a) => !a.earned);
  const completedPrograms = programs.filter((p) => p.progress === 100 || p.progress >= 65);
  const totalProgress = Math.round((earned.length / achievements.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 shadow-soft">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="text-primary-foreground">
              <h1 className="font-display text-4xl font-bold">Your Achievements</h1>
              <p className="mt-2 text-primary-foreground/85">You've earned {earned.length} of {achievements.length} badges. Keep going to unlock the rest!</p>
              <div className="mt-5 max-w-md">
                <div className="mb-2 flex justify-between text-sm font-medium">
                  <span>Overall progress</span>
                  <span>{totalProgress}%</span>
                </div>
                <Progress value={totalProgress} className="h-2 bg-white/20" />
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-3xl bg-white/15 p-5 text-primary-foreground backdrop-blur-sm">
              <Trophy className="h-10 w-10" />
              <div>
                <div className="text-xs">Total points</div>
                <div className="font-display text-3xl font-bold">{mockUser.totalPoints.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="mt-10">
          <h2 className="mb-5 font-display text-2xl font-bold">Earned Badges</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {earned.map((a) => (
              <div key={a.id} className="group rounded-3xl border border-border bg-gradient-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-card text-4xl shadow-soft">
                    {a.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">{a.title}</h3>
                    <p className="text-sm text-muted-foreground">{a.description}</p>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-warning/20 px-2.5 py-0.5 text-xs font-semibold text-warning-foreground">
                      <Trophy className="h-3 w-3" /> +{a.points} pts
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-5 font-display text-2xl font-bold text-muted-foreground">Locked</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locked.map((a) => (
              <div key={a.id} className="relative rounded-3xl border border-dashed border-border bg-card p-6 opacity-70">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-muted text-4xl grayscale">
                    {a.icon}
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 font-display text-lg font-bold text-muted-foreground">
                      <Lock className="h-4 w-4" /> {a.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{a.description}</p>
                    <div className="mt-2 text-xs text-muted-foreground">Unlock to earn +{a.points} pts</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section className="mt-12">
          <h2 className="mb-5 flex items-center gap-2 font-display text-2xl font-bold">
            <Award className="h-6 w-6 text-primary" /> Certificates
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {completedPrograms.map((p) => (
              <div key={p.id} className="overflow-hidden rounded-3xl border-2 border-primary/20 bg-card shadow-soft">
                <div className="border-b border-dashed border-border bg-gradient-card p-6 text-center">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">Certificate of Completion</div>
                  <div className="mt-4 font-display text-2xl font-bold">{p.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">Awarded to</div>
                  <div className="font-display text-xl font-bold text-foreground">{mockUser.name}</div>
                  <Award className="mx-auto mt-3 h-10 w-10 text-primary" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-xs text-muted-foreground">Issued · HealthyHub Academy</span>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <Download className="mr-1.5 h-3.5 w-3.5" /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
