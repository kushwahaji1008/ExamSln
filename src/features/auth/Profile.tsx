import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  Edit3,
  X,
  Save,
  Loader2,
  BookOpen,
  GraduationCap,
  HelpCircle,
  Activity,
  CheckCircle2,
  Award,
  Lock,
} from 'lucide-react';
import { useAuth } from '@/app/providers/AuthProvider';
import apiClient from '@/services/api/client';
import { genAuth, genAttempts, genExams, genQuestions } from '@/services/api/generated';
import { changePassword } from '@/features/auth/services/authService';

// Strict numeric role definitions matching system schema
// 0 = Student | 1 = Teacher | 2 = Admin | 3 = SuperAdmin
const ROLE_LABELS: Record<number | string, { label: string; color: string }> = {
  0: { label: 'Student', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
  1: { label: 'Teacher', color: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' },
  2: { label: 'Admin', color: 'bg-rose-500/10 border-rose-500/20 text-rose-400' },
  3: { label: 'SuperAdmin', color: 'bg-amber-500/10 border-amber-500/20 text-amber-400' },
  Student: { label: 'Student', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
  Teacher: { label: 'Teacher', color: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' },
  Admin: { label: 'Admin', color: 'bg-rose-500/10 border-rose-500/20 text-rose-400' },
  SuperAdmin: { label: 'SuperAdmin', color: 'bg-amber-500/10 border-amber-500/20 text-amber-400' },
};

function getRoleInfo(role?: number | string) {
  if (role === undefined || role === null) {
    return { label: 'Unknown', color: 'bg-slate-500/10 border-slate-500/20 text-slate-400' };
  }
  return ROLE_LABELS[role] ?? { label: String(role), color: 'bg-slate-500/10 border-slate-500/20 text-slate-400' };
}

interface ActivityState {
  courseCount: number;
  upcomingExamCount: number;
  recentAttemptCount: number;
  latestCourse: string;
  latestExam: string;
  latestQuestion: string;
  questionCount: number;
  examCount: number;
  userCount: number;
  healthStatus: string;
  isLoading: boolean;
}

export default function Profile() {
  const { user, refreshUser } = useAuth();
  
  // Profile Update State
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: '', phone: '', email: '' });
  const [saving, setSaving] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password Change State
  const [oldPassword, setOldPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passLoading, setPassLoading] = useState(false);
  const [passMessage, setPassMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [activity, setActivity] = useState<ActivityState>({
    courseCount: 0,
    upcomingExamCount: 0,
    recentAttemptCount: 0,
    latestCourse: '',
    latestExam: '',
    latestQuestion: '',
    questionCount: 0,
    examCount: 0,
    userCount: 0,
    healthStatus: 'unknown',
    isLoading: true,
  });

  // Role Type Helper Guards
  const isStudent = useMemo(() => user?.role === 0 || user?.role === 'Student', [user?.role]);
  const isTeacher = useMemo(() => user?.role === 1 || user?.role === 'Teacher', [user?.role]);
  const isAdmin = useMemo(() => user?.role === 2 || user?.role === 'Admin' || user?.role === 3 || user?.role === 'SuperAdmin', [user?.role]);

  const initializeForm = useCallback(() => {
    if (user) {
      setForm({
        fullName: user.fullName || '',
        phone: user.phone || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const toggleEdit = () => {
    if (!editing) initializeForm();
    setEditing((prev) => !prev);
    setUpdateMessage(null);
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      setUpdateMessage({ type: 'error', text: 'Unable to update profile without user ID.' });
      return;
    }

    setSaving(true);
    setUpdateMessage(null);

    try {
      await genAuth.updateUser(user.id, {
        fullName: form.fullName.trim(),
        phone: form.phone.trim() || undefined,
        email: form.email.trim(),
        passwordHash: '',
        role: user.role as any,
      });

      if (refreshUser) {
        await refreshUser();
      }

      setEditing(false);
      setUpdateMessage({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err: any) {
      setUpdateMessage({
        type: 'error',
        text: err?.response?.data?.message || 'Failed to update profile. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassLoading(true);
    setPassMessage(null);

    try {
      await changePassword({ 
        oldPassword, 
        newPassword: newPass 
      });
      
      setPassMessage({ type: 'success', text: 'Password updated successfully!' });
      setOldPassword('');
      setNewPass('');
    } catch (err: any) {
      setPassMessage({ 
        type: 'error', 
        text: err?.response?.data?.message || 'Failed to update password.' 
      });
    } finally {
      setPassLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadActivity = async () => {
      if (!user) return;
      
      try {
        if (isStudent) {
          const [coursesRes, examsRes, attemptsRes] = await Promise.all([
            apiClient.get('/api/videos/courses').catch(() => ({ data: [] })),
            genExams.listExams().catch(() => []),
            genAttempts.getMyAttempts().catch(() => []),
          ]);

          if (!isMounted) return;

          const courses = Array.isArray(coursesRes.data) ? coursesRes.data : [];
          const exams = Array.isArray(examsRes) ? examsRes : [];
          const attempts = Array.isArray(attemptsRes) ? attemptsRes : [];

          setActivity((prev) => ({
            ...prev,
            courseCount: courses.length,
            upcomingExamCount: exams.length,
            recentAttemptCount: attempts.length,
            latestCourse: courses[0]?.title || '',
            latestExam: exams[0]?.title || '',
            isLoading: false,
          }));
        } else if (isTeacher) {
          const [questionsRes, examsRes] = await Promise.all([
            genQuestions.listQuestions().catch(() => []),
            genExams.listExams().catch(() => []),
          ]);

          if (!isMounted) return;

          const questions = Array.isArray(questionsRes) ? questionsRes : [];
          const exams = Array.isArray(examsRes) ? examsRes : [];

          setActivity((prev) => ({
            ...prev,
            questionCount: questions.length,
            examCount: exams.length,
            latestQuestion: questions[0]?.questionText || '',
            latestExam: exams[0]?.title || '',
            isLoading: false,
          }));
        } else if (isAdmin) {
          const [usersRes, healthRes] = await Promise.all([
            genAuth.listUsers().catch(() => []),
            apiClient.get('/api/auth/health').catch(() => ({ data: { status: 'healthy' } })),
          ]);

          if (!isMounted) return;

          setActivity((prev) => ({
            ...prev,
            userCount: Array.isArray(usersRes) ? usersRes.length : 0,
            healthStatus: healthRes.data?.status || 'Healthy',
            isLoading: false,
          }));
        }
      } catch {
        if (isMounted) {
          setActivity((prev) => ({ ...prev, isLoading: false }));
        }
      }
    };

    loadActivity();

    return () => {
      isMounted = false;
    };
  }, [user, isStudent, isTeacher, isAdmin]);

  if (!user) {
    return (
      <div className="min-h-[400px] w-full flex items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
      </div>
    );
  }

  const initials = user.fullName
    ? user.fullName
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0]?.toUpperCase())
        .slice(0, 2)
        .join('')
    : '?';

  const roleInfo = getRoleInfo(user.role);

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans text-slate-100">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Account Profile</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your credentials and personal parameters for your {roleInfo.label} account.
          </p>
        </div>
        <button
          onClick={toggleEdit}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
            editing
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10'
              : 'bg-sky-500 text-white hover:bg-sky-400 shadow-lg shadow-sky-500/20'
          }`}
        >
          {editing ? (
            <>
              <X className="w-4 h-4" />
              <span>Cancel Edit</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      {/* Notification Toast */}
      {updateMessage && (
        <div
          className={`rounded-xl border p-4 text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            updateMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}
        >
          {updateMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <X className="w-5 h-5 shrink-0" />
          )}
          <span>{updateMessage.text}</span>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Main User Card & Password */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Profile Details Card */}
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-white/5 pb-6">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-600 to-violet-600 text-3xl font-bold text-white shadow-lg shadow-sky-500/20">
                {initials}
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${roleInfo.color}`}>
                    {roleInfo.label}
                  </span>
                </div>
                <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>{user.email}</span>
                </p>
              </div>
            </div>

            {!editing ? (
              <div className="grid gap-4 sm:grid-cols-3 pt-2">
                <div className="rounded-2xl bg-slate-950/60 border border-white/5 p-4">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Account Role</div>
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-sky-400" />
                    <span>{roleInfo.label}</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-950/60 border border-white/5 p-4">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Phone Number</div>
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>{user.phone || 'Not provided'}</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-950/60 border border-white/5 p-4">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Status</div>
                  <div className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active</span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={saveProfile} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-11 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition duration-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-11 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition duration-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-11 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition duration-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving Changes...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Password Update Card */}
          <form onSubmit={handlePasswordChange} className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Security Settings</h2>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-11 pr-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="password" required minLength={6} value={newPass} onChange={(e) => setNewPass(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-11 pr-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {passMessage && (
              <div className={`mt-6 flex items-center gap-3 rounded-xl p-4 text-sm font-medium animate-in fade-in ${passMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                {passMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <X className="w-5 h-5 shrink-0" />}
                {passMessage.text}
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button type="submit" disabled={passLoading} className="inline-flex items-center gap-2 rounded-xl bg-slate-800 border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-700 disabled:opacity-50">
                {passLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
              </button>
            </div>
          </form>

        </div>

        {/* Right Column: Metrics & Role Overview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {isStudent && (
              <>
                <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-5 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center gap-3 text-sky-400 mb-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Courses</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{activity.courseCount}</div>
                  <p className="text-xs text-slate-500 mt-1">Enrolled courses</p>
                </div>

                <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-5 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center gap-3 text-indigo-400 mb-2">
                    <Award className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Exams</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{activity.upcomingExamCount}</div>
                  <p className="text-xs text-slate-500 mt-1">Upcoming assessments</p>
                </div>
              </>
            )}

            {isTeacher && (
              <>
                <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-5 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center gap-3 text-emerald-400 mb-2">
                    <HelpCircle className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Question Bank</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{activity.questionCount}</div>
                  <p className="text-xs text-slate-500 mt-1">Questions created</p>
                </div>

                <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-5 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center gap-3 text-sky-400 mb-2">
                    <GraduationCap className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Exams</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{activity.examCount}</div>
                  <p className="text-xs text-slate-500 mt-1">Published exams</p>
                </div>
              </>
            )}

            {isAdmin && (
              <>
                <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-5 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center gap-3 text-rose-400 mb-2">
                    <UserIcon className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">System Users</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{activity.userCount}</div>
                  <p className="text-xs text-slate-500 mt-1">Total registered users</p>
                </div>

                <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-5 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center gap-3 text-emerald-400 mb-2">
                    <Activity className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">System Health</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 capitalize">{activity.healthStatus}</div>
                  <p className="text-xs text-slate-500 mt-1">Services operational</p>
                </div>
              </>
            )}
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-xl space-y-3 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-sky-400" />
              <span>Role Overview</span>
            </h3>

            {isStudent && (
              <p className="text-sm text-slate-400 leading-relaxed">
                As a Student (Role 0), you can view enrolled courses, join live sessions, take scheduled exams, and review your completed attempt scores.
              </p>
            )}

            {isTeacher && (
              <p className="text-sm text-slate-400 leading-relaxed">
                As a Teacher (Role 1), you can author questions, publish structured exams, set up live classes, and inspect student attempt metrics.
              </p>
            )}

            {isAdmin && (
              <p className="text-sm text-slate-400 leading-relaxed">
                As an Administrator (Role 2 / 3), you have full system control to manage users, inspect proctoring logs, and verify service health.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}