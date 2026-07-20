import { Link, Navigate } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  BookOpen,
  Users,
  GraduationCap,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";

const features = [
  {
    title: "Smart Exam Management",
    description: "Create, schedule, and publish exams securely for your students.",
    icon: BookOpen,
  },
  {
    title: "Live Progress Tracking",
    description: "Monitor learner activity, attempts, and performance in real time.",
    icon: Rocket,
  },
  {
    title: "Role-Based Access",
    description: "Student, teacher and admin experiences tailored to each user.",
    icon: ShieldCheck,
  },
];

const roles = [
  {
    role: "For Students",
    detail: "Discover courses, prepare with upcoming exams, and track your progress visually.",
    badge: "Learn faster",
    accent: "bg-indigo-600/10 text-indigo-700",
  },
  {
    role: "For Teachers",
    detail: "Build rich question pools, publish exams, and analyze student results effortlessly.",
    badge: "Create impact",
    accent: "bg-emerald-600/10 text-emerald-700",
  },
  {
    role: "For Admins",
    detail: "Manage users, check system health, and keep the platform running smoothly.",
    badge: "Stay in control",
    accent: "bg-cyan-600/10 text-cyan-700",
  },
];

export default function LandingPage() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 -top-24 h-72 bg-gradient-to-r from-indigo-500 via-violet-600 to-sky-500 opacity-40 blur-3xl" />
        <div className="absolute right-0 top-36 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100 ring-1 ring-white/10 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-amber-300" />
                Ready for exams that feel exciting and fair?
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
                  Elevate exam prep with a smarter learning platform.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Build tests, manage courses, and keep every role aligned with a fast, beautiful interface designed for schools and training centers.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-base font-semibold text-slate-100 transition hover:bg-slate-800"
                >
                  Login
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <p className="text-3xl font-semibold">100+</p>
                  <p className="mt-2 text-sm text-slate-400">Live exams launched</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <p className="text-3xl font-semibold">50k+</p>
                  <p className="mt-2 text-sm text-slate-400">Students preparing</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <p className="text-3xl font-semibold">99.9%</p>
                  <p className="mt-2 text-sm text-slate-400">System uptime</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/60">
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-indigo-400/20 via-transparent to-cyan-400/20" />
              <div className="relative space-y-6">
                <div className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Live scorecard</p>
                      <h2 className="mt-3 text-3xl font-semibold text-white">Exam readiness</h2>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-300">
                      Active
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    {[
                      { label: "Students", value: "1.2k" },
                      { label: "Questions", value: "420" },
                      { label: "Pass rate", value: "92%" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between rounded-3xl bg-slate-800/80 px-4 py-3">
                        <span className="text-sm text-slate-400">{stat.label}</span>
                        <span className="text-base font-semibold text-white">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10 backdrop-blur-xl">
                    <p className="text-sm text-slate-400">Next exam</p>
                    <p className="mt-3 text-lg font-semibold text-white">Math Mock Test</p>
                    <p className="mt-2 text-sm text-slate-500">Starts in 2h 34m</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10 backdrop-blur-xl">
                    <p className="text-sm text-slate-400">Progress</p>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                    </div>
                    <p className="mt-3 text-sm text-slate-500">62% course completion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">What makes it modern?</p>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              A seamless experience for every role.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              Students, teachers, and admins each get a polished dashboard, fast workflows, and a responsive platform that looks great on every device.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-slate-900/95"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300 transition group-hover:bg-indigo-500/20">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16">
        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((item) => (
            <div key={item.role} className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.role}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{item.badge}</h3>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.accent}`}>{item.role.split(" ")[1]}</span>
              </div>
              <p className="mt-6 text-slate-400">{item.detail}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Easy onboarding and fast setup.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
