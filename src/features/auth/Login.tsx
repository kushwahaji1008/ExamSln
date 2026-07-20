import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "@/features/auth/services/authService";
import { useAuth } from "@/app/providers/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      login(data.user, data.token);
      const rawRole = data.user.role;
      const roleVal = typeof rawRole === 'string' ? rawRole.toLowerCase() : Number(rawRole);

      if (roleVal === 0 || roleVal === 'student') navigate('/student');
      else if (roleVal === 1 || roleVal === 'teacher') navigate('/teacher');
      else if (roleVal === 'admin' || roleVal === 2) navigate('/admin');
      else navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center">
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-500 via-indigo-600 to-violet-700 p-10 text-white shadow-2xl shadow-slate-950/40">
          <div className="absolute inset-x-0 top-0 h-40 bg-white/10 blur-3xl" />
          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-slate-100 shadow-sm shadow-white/10">
              Your exam dashboard awaits
            </span>
            <h1 className="text-5xl font-semibold leading-tight">Sign in and get back to learning.</h1>
            <p className="max-w-xl text-base leading-7 text-slate-100/90">
              Fast access to exams, courses, and real-time progress for students, teachers, and admins.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Secure</p>
                <p className="mt-3 font-semibold text-white">Safe token-based login</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Fast</p>
                <p className="mt-3 font-semibold text-white">Instant dashboard access</p>
              </div>
            </div>
          </div>
        </section>

        <div className="rounded-[2rem] bg-slate-900/95 p-8 shadow-2xl shadow-black/40 ring-1 ring-white/10">
          <div className="mb-8">
            <span className="rounded-full bg-slate-800 px-4 py-2 text-sm uppercase tracking-[0.24em] text-slate-300">Login</span>
            <h2 className="mt-6 text-3xl font-semibold text-white">Welcome back</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Enter your credentials to continue to your personalized hub.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200">Email</label>
              <input
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200">Password</label>
              <input
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="mt-4 rounded-3xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}

          <button
            className="mt-8 w-full rounded-3xl bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
