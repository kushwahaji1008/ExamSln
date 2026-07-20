import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { useRegister } from './hooks/useRegister';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<number>(0); // 0=student, 1=teacher
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { register } = useRegister();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRegister = async () => {
    setError(null);
    setLoading(true);

    if (!fullName.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Valid email is required');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const result = await register({ fullName, email, password, phone: phone || undefined, role });
      if (!result.success) {
        setError(result.error || 'Registration failed');
        return;
      }

      if (result.status === 204) {
        alert('Registration successful. Please login.');
        navigate('/login');
        return;
      }

      const data = result.data;
      if (data?.token && data?.user) {
        login(data.user as any, data.token);
        const roleVal = typeof data.user.role === 'string' ? data.user.role.toLowerCase() : Number(data.user.role);
        if (roleVal === 0 || roleVal === 'student') navigate('/student');
        else if (roleVal === 1 || roleVal === 'teacher') navigate('/teacher');
        else navigate('/dashboard');
        return;
      }

      alert('Registration completed. Please login.');
      navigate('/login');
    } catch {
      setError('Unable to complete registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <section className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-10 text-white shadow-2xl shadow-black/40">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-slate-100 shadow-sm shadow-white/10">
            Ready to join?
          </div>
          <h1 className="mt-8 text-5xl font-semibold leading-tight">Create your account and get started.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-200/85">
            Choose student or teacher access, then manage your dashboard and exams with a beautiful interface.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-xl transition hover:bg-white/15">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Student</p>
              <p className="mt-3 font-semibold text-white">Track courses and attempts.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-xl transition hover:bg-white/15">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Teacher</p>
              <p className="mt-3 font-semibold text-white">Create exams and review results.</p>
            </div>
          </div>
        </section>

        <div className="rounded-[2rem] bg-slate-900/95 p-8 shadow-2xl shadow-black/40 ring-1 ring-white/10">
          <div className="mb-8">
            <span className="rounded-full bg-slate-800 px-4 py-2 text-sm uppercase tracking-[0.24em] text-slate-300">Register</span>
            <h2 className="mt-6 text-3xl font-semibold text-white">Join the platform</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Fill in your details and continue to your tailored experience.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200">Full name</label>
              <input
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200">Email</label>
              <input
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200">Password</label>
              <input
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200">Role</label>
              <select
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                value={role}
                onChange={(e) => setRole(Number(e.target.value))}
              >
                <option value={0}>Student</option>
                <option value={1}>Teacher</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200">Phone (optional)</label>
              <input
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="mt-4 rounded-3xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}

          <button
            className="mt-8 w-full rounded-3xl bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
