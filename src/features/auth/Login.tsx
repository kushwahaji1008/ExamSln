import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthProvider';
import { loginUser } from '@/features/auth/services/authService';
import { UserRole } from '@/features/auth/types/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect immediately based on strictly casted role
  if (user) {
    const roleVal = Number(user.role);
    if (roleVal === 2) return <Navigate to="/admin" replace />;
    if (roleVal === 1) return <Navigate to="/teacher" replace />;
    return <Navigate to="/student" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      
      // 1. CRITICAL FIX: Persist to localStorage immediately so the Dashboard can read it
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 2. Update the React Context state
      // (If your login function is async, you might need to await it)
      await login(data.user, data.token);

      // 3. STRICT ROUTING: Force it to a Number to guarantee our 0, 1, 2 rule works safely
      const roleVal = Number(data.user.role);
      
      if (roleVal === 2) {
        navigate('/admin');
      } else if (roleVal === 1) {
        navigate('/teacher');
      } else {
        // Default fallback is Student (0)
        navigate('/student');
      }
      
    } catch (err: any) {
      setError(
        err?.response?.data?.message || 'Login failed. Please verify your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Hero Visual Card */}
        <div className="lg:col-span-7 hidden lg:flex flex-col justify-between rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/80 p-12 ring-1 ring-border/10 backdrop-blur-2xl min-h-[640px]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ExamSolution Engine v1.0</span>
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-primary-foreground">
              Master your learning journey with <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">real-time insights</span>.
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Access your personalized portal for adaptive exam taking, live class participation, and automated performance analytics.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="rounded-2xl bg-slate-900/60 border border-border/5 p-5 backdrop-blur-md">
              <div className="flex items-center gap-3 text-sky-400 mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-semibold text-primary-foreground">AI Proctoring</span>
              </div>
              <p className="text-xs text-slate-400 leading-5">Automated detection ensuring complete integrity during online exams.</p>
            </div>

            <div className="rounded-2xl bg-slate-900/60 border border-border/5 p-5 backdrop-blur-md">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                <Zap className="w-5 h-5" />
                <span className="font-semibold text-primary-foreground">Instant Feedback</span>
              </div>
              <p className="text-xs text-slate-400 leading-5">Receive instant score reports and question explanations right after submission.</p>
            </div>
          </div>
        </div>

        {/* Right Authentication Form */}
        <div className="lg:col-span-5 w-full rounded-3xl bg-slate-900/90 border border-border/10 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary-foreground tracking-tight">Sign In</h2>
            <p className="mt-2 text-sm text-slate-400">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-11 pr-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition duration-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <a href="/forgot-password" className="text-xs font-medium text-sky-400 hover:text-sky-300 transition">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-11 pr-11 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition duration-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-3.5 text-xs font-medium text-rose-400 animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 py-3.5 px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-sky-500/20 transition-all duration-200 hover:bg-sky-400 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-sky-500"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Registration Redirect */}
          <div className="mt-8 text-center text-xs text-slate-400">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-sky-400 hover:text-sky-300 transition underline underline-offset-4">
              Create an account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}