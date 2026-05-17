import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Mail, Lock, ArrowRight, BookOpen, Trophy, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const DEMO_EMAIL = "student@gmail.com";
const DEMO_PASSWORD = "student1234";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Healthy Student Lifestyle Hub — Learn. Grow. Thrive." },
      { name: "description", content: "An interactive LMS helping students master sleep, stress, fitness, and healthy daily routines through gamified learning." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
        setError("Incorrect email or password.");
        toast.error("Incorrect email or password.");
        return;
      }
    }
    setError(null);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Left: Brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-hero p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px), radial-gradient(circle at 70% 70%, white 1px, transparent 1px)", backgroundSize: "32px 32px, 48px 48px" }} />
        <div className="relative flex items-center gap-2 text-primary-foreground">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/25 backdrop-blur-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold">HealthyHub</span>
        </div>

        <div className="relative space-y-6 text-primary-foreground">
          <h1 className="font-display text-5xl font-bold leading-tight">
            Build healthier habits, one lesson at a time.
          </h1>
          <p className="max-w-md text-lg text-primary-foreground/85">
            Join thousands of students learning to sleep better, stress less, and study smarter through gamified, science-backed programs.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { icon: BookOpen, label: "30+ Programs" },
              { icon: Trophy, label: "Earn Badges" },
              { icon: Heart, label: "Wellness First" },
            ].map((f) => (
              <div key={f.label} className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
                <f.icon className="mb-2 h-5 w-5" />
                <div className="text-sm font-semibold">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-sm text-primary-foreground/70">
          "Small daily wins compound into a life you love." — Continue Learning
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">HealthyHub</span>
          </div>

          <div className="mb-2 inline-flex rounded-full bg-muted p-1">
            <button
              onClick={() => setMode("login")}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition ${mode === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Sign in
            </button>
            <button
              onClick={() => setMode("register")}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition ${mode === "register" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Create account
            </button>
          </div>

          <h2 className="mt-6 font-display text-3xl font-bold text-foreground">
            {mode === "login" ? "Welcome back 👋" : "Start your journey 🌱"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login" ? "Continue learning where you left off." : "Create an account and unlock your first program free."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Alex Morgan" className="h-12 rounded-xl" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@university.edu" defaultValue="alex.morgan@university.edu" className="h-12 rounded-xl pl-11" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" defaultValue="demo1234" className="h-12 rounded-xl pl-11" required />
              </div>
            </div>

            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="rounded" /> Remember me
                </label>
                <a className="font-medium text-primary hover:underline" href="#">Forgot password?</a>
              </div>
            )}

            <Button type="submit" className="h-12 w-full rounded-xl bg-gradient-hero text-base font-semibold shadow-soft hover:shadow-glow">
              {mode === "login" ? "Continue Learning" : "Create my account"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you agree to our <Link to="/" className="underline">Terms</Link> and <Link to="/" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
