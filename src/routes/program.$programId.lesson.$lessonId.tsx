import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, PlayCircle, Lightbulb } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { programs } from "@/lib/mockData";

export const Route = createFileRoute("/program/$programId/lesson/$lessonId")({
  loader: ({ params }) => {
    const program = programs.find((p) => p.id === params.programId);
    if (!program) throw notFound();
    const idx = program.lessons.findIndex((l) => l.id === params.lessonId);
    if (idx === -1) throw notFound();
    return { program, lesson: program.lessons[idx], index: idx };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.lesson.title ?? "Lesson"} — HealthyHub` }],
  }),
  component: LessonPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Link to="/dashboard" className="text-primary underline">Back to dashboard</Link>
    </div>
  ),
});

function LessonPage() {
  const { program, lesson, index } = Route.useLoaderData();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const prev = program.lessons[index - 1];
  const next = program.lessons[index + 1];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/program/$programId" params={{ programId: program.id }} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {program.title}
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <main>
            {/* Video */}
            <div className="overflow-hidden rounded-3xl border border-border bg-black shadow-soft">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${lesson.videoId}`}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Lesson body */}
            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                Lesson {index + 1} of {program.lessons.length} · {lesson.duration}
              </div>
              <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">{lesson.title}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{lesson.description}</p>

              <div className="mt-6 rounded-3xl border border-border bg-gradient-card p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                  <Lightbulb className="h-4 w-4" /> Key Takeaway
                </div>
                <p className="text-foreground/90">{lesson.notes}</p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  onClick={() => setCompleted(true)}
                  disabled={completed}
                  size="lg"
                  className={`rounded-xl ${completed ? "bg-success text-success-foreground" : "bg-gradient-hero shadow-soft hover:shadow-glow"}`}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  {completed ? "Completed!" : "Mark as Complete"}
                </Button>

                <div className="flex gap-2">
                  {prev && (
                    <Button
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => navigate({ to: "/program/$programId/lesson/$lessonId", params: { programId: program.id, lessonId: prev.id } })}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                  )}
                  {next ? (
                    <Button
                      className="rounded-xl bg-primary"
                      onClick={() => navigate({ to: "/program/$programId/lesson/$lessonId", params: { programId: program.id, lessonId: next.id } })}
                    >
                      Next lesson <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      className="rounded-xl bg-secondary"
                      onClick={() => navigate({ to: "/program/$programId/quiz", params: { programId: program.id } })}
                    >
                      Take the quiz <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </main>

          {/* Sidebar: lesson list */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
              <div className="mb-3 px-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Course content</div>
                <div className="font-display font-bold">{program.title}</div>
              </div>
              <div className="space-y-1">
                {program.lessons.map((l: typeof program.lessons[number], i: number) => {
                  const active = l.id === lesson.id;
                  return (
                    <Link
                      key={l.id}
                      to="/program/$programId/lesson/$lessonId"
                      params={{ programId: program.id, lessonId: l.id }}
                      className={`flex items-center gap-3 rounded-xl p-3 text-sm transition ${active ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                    >
                      <PlayCircle className={`h-4 w-4 shrink-0 ${active ? "text-primary" : ""}`} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{l.title}</div>
                        <div className="text-xs opacity-70">{l.duration}</div>
                      </div>
                      {i + 1 <= Math.floor((program.progress / 100) * program.lessons.length) && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
