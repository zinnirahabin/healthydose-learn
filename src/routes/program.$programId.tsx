import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, BookOpen, Trophy, CheckCircle2, PlayCircle, Award, FileQuestion } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { programs } from "@/lib/mockData";

export const Route = createFileRoute("/program/$programId")({
  loader: ({ params }) => {
    const program = programs.find((p) => p.id === params.programId);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.program.title ?? "Program"} — HealthyHub` },
      { name: "description", content: loaderData?.program.description ?? "" },
    ],
  }),
  component: ProgramDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Link to="/dashboard" className="text-primary underline">Back to dashboard</Link>
    </div>
  ),
});

function ProgramDetail() {
  const { program } = Route.useLoaderData();
  const Icon = program.icon;
  const completedCount = Math.floor((program.progress / 100) * program.lessons.length);
  const firstIncomplete = program.lessons[completedCount] ?? program.lessons[0];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>

        {/* Banner */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${program.color} p-8 shadow-soft sm:p-12`}>
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/25 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {program.category}
              </div>
              <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">{program.title}</h1>
              <p className="mt-3 max-w-xl text-white/90">{program.longDescription}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/90">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{program.duration}</span>
                <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" />{program.lessons.length} lessons</span>
                <span className="flex items-center gap-1.5"><Trophy className="h-4 w-4" />{program.points} pts</span>
              </div>
            </div>
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white/25 backdrop-blur-sm">
              <Icon className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Lessons list */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Lessons</h2>
              <span className="text-sm text-muted-foreground">{completedCount} of {program.lessons.length} complete</span>
            </div>
            <div className="space-y-3">
              {program.lessons.map((lesson, i) => {
                const done = i < completedCount;
                const current = i === completedCount;
                return (
                  <Link
                    key={lesson.id}
                    to="/program/$programId/lesson/$lessonId"
                    params={{ programId: program.id, lessonId: lesson.id }}
                    className={`group flex items-center gap-4 rounded-2xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft ${current ? "border-primary/40 bg-primary-soft/30" : "border-border"}`}
                  >
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${done ? "bg-success/20" : current ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      {done ? <CheckCircle2 className="h-5 w-5 text-success" /> : <PlayCircle className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground">Lesson {i + 1}</span>
                        {current && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">Up Next</span>}
                      </div>
                      <div className="font-semibold text-foreground group-hover:text-primary">{lesson.title}</div>
                      <div className="text-xs text-muted-foreground">{lesson.description} · {lesson.duration}</div>
                    </div>
                  </Link>
                );
              })}

              {/* Final quiz */}
              <Link
                to="/program/$programId/quiz"
                params={{ programId: program.id }}
                className="group flex items-center gap-4 rounded-2xl border border-dashed border-secondary/40 bg-secondary/5 p-4 transition-all hover:border-secondary hover:shadow-soft"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/20">
                  <FileQuestion className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wide text-secondary">Final Quiz</div>
                  <div className="font-semibold text-foreground">Test your knowledge</div>
                  <div className="text-xs text-muted-foreground">5 questions · Earn your certificate</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-2 text-sm font-medium text-muted-foreground">Your progress</div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-primary">{program.progress}%</span>
                <span className="text-sm text-muted-foreground">complete</span>
              </div>
              <Progress value={program.progress} className="mt-3 h-2.5" />
              <Link to="/program/$programId/lesson/$lessonId" params={{ programId: program.id, lessonId: firstIncomplete.id }}>
                <Button className="mt-5 w-full rounded-xl bg-gradient-hero shadow-soft hover:shadow-glow" size="lg">
                  {program.progress > 0 ? "Continue Learning" : "Start Learning"}
                </Button>
              </Link>
            </div>

            <div className="rounded-3xl bg-gradient-card p-6">
              <div className="mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="font-display font-bold">Rewards</h3>
              </div>
              <p className="text-sm text-muted-foreground">Finish this program to earn:</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-card p-3">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="text-sm font-semibold">{program.points} points</div>
                    <div className="text-xs text-muted-foreground">Added to your total</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-card p-3">
                  <div className="text-2xl">🎖️</div>
                  <div>
                    <div className="text-sm font-semibold">{program.title} Badge</div>
                    <div className="text-xs text-muted-foreground">Display on your profile</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-card p-3">
                  <div className="text-2xl">📜</div>
                  <div>
                    <div className="text-sm font-semibold">Certificate</div>
                    <div className="text-xs text-muted-foreground">Sharable PDF</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
