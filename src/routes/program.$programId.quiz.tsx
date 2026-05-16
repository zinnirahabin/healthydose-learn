import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { programs, sampleQuiz } from "@/lib/mockData";

export const Route = createFileRoute("/program/$programId/quiz")({
  loader: ({ params }) => {
    const program = programs.find((p) => p.id === params.programId);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Quiz: ${loaderData?.program.title ?? ""} — HealthyHub` }],
  }),
  component: QuizPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Link to="/dashboard" className="text-primary underline">Back to dashboard</Link>
    </div>
  ),
});

function QuizPage() {
  const { program } = Route.useLoaderData();
  const questions = sampleQuiz.default;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const percent = Math.round((score / questions.length) * 100);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    if (isLast) {
      setShowResult(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const passed = percent >= 60;
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <div className={`bg-gradient-to-br ${passed ? "from-emerald-400 to-teal-400" : "from-amber-400 to-orange-400"} p-8 text-center text-white`}>
              <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm">
                {passed ? <Trophy className="h-10 w-10" /> : <Sparkles className="h-10 w-10" />}
              </div>
              <h1 className="font-display text-3xl font-bold">{passed ? "Great job!" : "Keep going!"}</h1>
              <p className="mt-2 text-white/90">{passed ? "You've mastered this program." : "Review the lessons and try again."}</p>
            </div>
            <div className="p-8">
              <div className="text-center">
                <div className="font-display text-6xl font-bold text-foreground">{percent}%</div>
                <div className="mt-2 text-muted-foreground">
                  You got <span className="font-semibold text-foreground">{score} out of {questions.length}</span> correct
                </div>
                {passed && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-success/15 px-4 py-2 text-sm font-semibold text-success">
                    <Trophy className="h-4 w-4" /> +{program.points} points earned
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-2">
                {questions.map((q, i) => {
                  const correct = answers[i] === q.correct;
                  return (
                    <div key={i} className={`flex items-start gap-3 rounded-xl p-3 ${correct ? "bg-success/10" : "bg-destructive/10"}`}>
                      {correct ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />}
                      <div className="text-sm">
                        <div className="font-medium text-foreground">{q.question}</div>
                        {!correct && <div className="mt-1 text-xs text-muted-foreground">Correct: {q.options[q.correct]}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex gap-3">
                <Button onClick={handleReset} variant="outline" className="flex-1 rounded-xl">
                  <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                </Button>
                <Link to="/program/$programId" params={{ programId: program.id }} className="flex-1">
                  <Button className="w-full rounded-xl bg-gradient-hero shadow-soft">Back to program</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <Link to="/program/$programId" params={{ programId: program.id }} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Exit quiz
        </Link>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-foreground">{program.title} Quiz</span>
            <span className="text-muted-foreground">Question {current + 1} of {questions.length}</span>
          </div>
          <Progress value={((current + 1) / questions.length) * 100} className="h-2" />
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="font-display text-2xl font-bold leading-snug text-foreground">{q.question}</h2>

          <div className="mt-6 space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition ${
                    isSelected ? "border-primary bg-primary-soft" : "border-border bg-card hover:border-primary/40 hover:bg-muted"
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="font-medium text-foreground">{opt}</span>
                </button>
              );
            })}
          </div>

          <Button
            onClick={handleNext}
            disabled={selected === null}
            size="lg"
            className="mt-8 w-full rounded-xl bg-gradient-hero shadow-soft hover:shadow-glow disabled:opacity-50"
          >
            {isLast ? "Submit Quiz" : "Next Question"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
