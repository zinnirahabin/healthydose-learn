import { Link } from "@tanstack/react-router";
import { Clock, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Program } from "@/lib/mockData";

export function ProgramCard({ program }: { program: Program }) {
  const Icon = program.icon;
  return (
    <Link
      to="/program/$programId"
      params={{ programId: program.id }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
    >
      <div className={`relative h-36 bg-gradient-to-br ${program.color} p-5`}>
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <div className="relative flex h-full items-start justify-between">
          <span className="rounded-full bg-white/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {program.category}
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/30 backdrop-blur-sm">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-foreground group-hover:text-primary">
          {program.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{program.description}</p>
        <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{program.duration}</span>
          <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{program.lessons.length} lessons</span>
        </div>
        {program.progress > 0 && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-primary">{program.progress}%</span>
            </div>
            <Progress value={program.progress} className="h-2" />
          </div>
        )}
      </div>
    </Link>
  );
}
