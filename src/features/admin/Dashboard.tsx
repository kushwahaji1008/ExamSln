import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, ShieldCheck, Activity, Sparkles, ChevronRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import api from "@/services/api";
import { fetchUsers } from "./api";

export default function AdminDashboard() {
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
  });

  const { data: health = { status: "unknown" }, isLoading: loadingHealth } = useQuery({
    queryKey: ["auth-health"],
    queryFn: async () => {
      const res = await api.get("/auth/health");
      return res.data;
    },
  });

  const countsByRole = useMemo(() => {
    const totals: Record<string, number> = {};
    if (Array.isArray(users)) {
      users.forEach((user: any) => {
        const role = user.role ?? "Unknown";
        totals[role] = (totals[role] ?? 0) + 1;
      });
    }
    return totals;
  }, [users]);

  const summaryCards = [
    { label: "Total Users", value: Array.isArray(users) ? users.length : 0, icon: Users, tone: "bg-slate-100 text-slate-900" },
    { label: "System Health", value: loadingHealth ? "..." : health.status ?? "unknown", icon: ShieldCheck, tone: "bg-emerald-100 text-emerald-800" },
    { label: "Updated", value: new Date().toLocaleDateString(), icon: Activity, tone: "bg-sky-100 text-sky-800" },
  ];

  return (
    <div className="space-y-10">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Monitor system performance, user growth, and role distribution across your platform." 
      />

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 text-white shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-slate-200">
                <Sparkles size={14} /> Platform pulse
              </span>
              <h2 className="text-4xl font-semibold tracking-tight">All systems are go.</h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">
                Track the latest user trends, review health status, and take action on critical workflows from one modern admin view.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Users onboarded</p>
              <p className="mt-4 text-4xl font-semibold text-white">{Array.isArray(users) ? users.length : 0}</p>
              <p className="text-sm text-slate-300">Current registered users</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Next step</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Review system health</h3>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Go to health
              <ChevronRight size={16} />
            </button>
          </div>
          <p className="mt-4 text-sm text-slate-600">Use the platform metrics below to identify trends and keep operations running smoothly.</p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-slate-300/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{card.label}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{card.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.tone}`}>
                <card.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Role Distribution</h2>
              <p className="text-sm text-slate-500">Users grouped by role</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">{Object.keys(countsByRole).length} roles</span>
          </div>
          <div className="space-y-3">
            {Object.entries(countsByRole).map(([role, count]) => (
              <div key={role} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span className="text-slate-700">{role}</span>
                <span className="font-semibold text-slate-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Recent Users</h2>
              <p className="text-sm text-slate-500">Latest signups and edits</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">Top 8</span>
          </div>
          {loadingUsers ? (
            <div className="rounded-[1.5rem] border border-dashed border-slate-200 p-6 text-center text-slate-500">Loading users...</div>
          ) : (
            <div className="space-y-3">
              {(Array.isArray(users) ? users : []).slice(0, 8).map((user: any) => (
                <div key={user.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{user.fullName ?? user.email ?? "Unnamed"}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">{user.role ?? "Unknown"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
