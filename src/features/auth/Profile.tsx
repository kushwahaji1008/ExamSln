import { useEffect, useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import apiClient from '@/services/api/client';
import { genAuth, genAttempts, genExams, genQuestions } from '@/services/api/generated';
import type { UserRole } from '@/services/api/generated/types';

const ROLE_LABELS: Record<UserRole | string, string> = {
  0: 'Student',
  1: 'Teacher',
  2: 'Admin',
  3: 'SuperAdmin',
  Student: 'Student',
  Teacher: 'Teacher',
  Admin: 'Admin',
  SuperAdmin: 'SuperAdmin',
};

function roleLabel(role: UserRole | string) {
  return ROLE_LABELS[role] ?? String(role ?? 'Unknown');
}

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: '', phone: '', email: '' });
  const [saving, setSaving] = useState(false);

  if (!user) return <div>Loading profile...</div>;

  const initializeForm = () => {
    setForm({ fullName: user.fullName ?? '', phone: user.phone ?? '', email: user.email ?? '' });
  };

  const toggleEdit = () => {
    if (!editing) initializeForm();
    setEditing((prev) => !prev);
  };

  const [activity, setActivity] = useState({
    courseCount: 0,
    upcomingExamCount: 0,
    recentAttemptCount: 0,
    latestCourse: '' as string,
    latestExam: '' as string,
    latestQuestion: '' as string,
    questionCount: 0,
    examCount: 0,
    userCount: 0,
    healthStatus: 'unknown',
  });

  const saveProfile = async () => {
    if (!user?.id) {
      alert('Unable to update profile without user id');
      return;
    }

    setSaving(true);
    try {
      await genAuth.updateUser(user.id, {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
      });
      await refreshUser();
      setEditing(false);
      alert('Profile updated');
    } catch {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const loadActivity = async () => {
      try {
        if (user.role === 0 || user.role === 'Student') {
          const [coursesRes, examsRes, attemptsRes] = await Promise.all([
            apiClient.get('/videos/courses'),
            genExams.listExams(),
            genAttempts.getMyAttempts(),
          ]);
          const courses = Array.isArray(coursesRes.data) ? coursesRes.data : [];
          const exams = Array.isArray(examsRes) ? examsRes : [];
          setActivity((prev) => ({
            ...prev,
            courseCount: courses.length,
            upcomingExamCount: exams.length,
            recentAttemptCount: Array.isArray(attemptsRes) ? attemptsRes.length : 0,
            latestCourse: courses[0]?.title ?? '',
            latestExam: exams[0]?.title ?? '',
          }));
        }

        if (user.role === 1 || user.role === 'Teacher') {
          const [questionsRes, examsRes] = await Promise.all([
            genQuestions.listQuestions(),
            genExams.listExams(),
          ]);
          const questions = Array.isArray(questionsRes) ? questionsRes : [];
          const exams = Array.isArray(examsRes) ? examsRes : [];
          setActivity((prev) => ({
            ...prev,
            questionCount: questions.length,
            examCount: exams.length,
            latestQuestion: questions[0]?.questionText ?? '',
            latestExam: exams[0]?.title ?? '',
          }));
        }

        if (user.role === 2 || user.role === 'Admin' || user.role === 3 || user.role === 'SuperAdmin') {
          const [usersRes, healthRes] = await Promise.all([
            genAuth.listUsers(),
            apiClient.get('/auth/health'),
          ]);
          setActivity((prev) => ({
            ...prev,
            userCount: Array.isArray(usersRes) ? usersRes.length : 0,
            healthStatus: healthRes.data?.status ?? 'unknown',
          }));
        }
      } catch {
        setActivity((prev) => ({ ...prev }));
      }
    };

    loadActivity();
  }, [user.role]);

  const initials = user.fullName
    ? user.fullName
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0]?.toUpperCase())
        .slice(0, 2)
        .join('')
    : '?';

  const activityCards = [
    ...(user.role === 0 || user.role === 'Student'
      ? [
          { title: 'Active Courses', description: `${activity.courseCount} enrolled course${activity.courseCount === 1 ? '' : 's'}` },
          { title: 'Upcoming Exams', description: `${activity.upcomingExamCount} upcoming exam${activity.upcomingExamCount === 1 ? '' : 's'}` },
          { title: 'Latest Course', description: activity.latestCourse || 'No recent course available' },
        ]
      : []),
    ...(user.role === 1 || user.role === 'Teacher'
      ? [
          { title: 'Questions', description: `${activity.questionCount} question${activity.questionCount === 1 ? '' : 's'} in your bank` },
          { title: 'Exams', description: `${activity.examCount} exam${activity.examCount === 1 ? '' : 's'} created` },
          { title: 'Latest Exam', description: activity.latestExam || 'No recent exam available' },
        ]
      : []),
    ...(user.role === 2 || user.role === 'Admin' || user.role === 3 || user.role === 'SuperAdmin'
      ? [
          { title: 'Users', description: `${activity.userCount} active user${activity.userCount === 1 ? '' : 's'}` },
          { title: 'Health Status', description: `System ${activity.healthStatus || 'unknown'}` },
          { title: 'Pending Reviews', description: 'Review pending user and content requests.' },
        ]
      : []),
  ];

  const renderStudentInfo = () => (
    <div className="space-y-2 bg-white p-4 rounded border">
      <h2 className="text-lg font-semibold">Student Info</h2>
      <div>See your enrolled courses, active exams, and recent activity here.</div>
      <div className="text-sm text-gray-500">Student dashboards and exam access are available from the sidebar.</div>
    </div>
  );

  const renderTeacherInfo = () => (
    <div className="space-y-2 bg-white p-4 rounded border">
      <h2 className="text-lg font-semibold">Teacher Info</h2>
      <div>Manage your exams, questions, and student assignments from the teacher panel.</div>
      <div className="text-sm text-gray-500">Use the sidebar links to access exam creation and question management.</div>
    </div>
  );

  const renderAdminInfo = () => (
    <div className="space-y-2 bg-white p-4 rounded border">
      <h2 className="text-lg font-semibold">Admin Tools</h2>
      <div>Manage users, system health, and content approvals from the admin dashboard.</div>
      <div className="text-sm text-gray-500">Admin-specific tools are available under the admin menu.</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-gray-600">Account details for {roleLabel(user.role)}.</p>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={toggleEdit}
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.8fr_1.2fr]">
        <div className="space-y-4 bg-white p-6 rounded border shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
                {initials}
              </div>
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="text-base font-medium">{user.fullName}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-lg bg-slate-50 p-3 text-center">
                <div className="text-sm text-gray-500">Role</div>
                <div className="text-base font-semibold">{roleLabel(user.role)}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 text-center">
                <div className="text-sm text-gray-500">Phone</div>
                <div className="text-base font-semibold">{user.phone || 'Not set'}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 text-center">
                <div className="text-sm text-gray-500">Status</div>
                <div className="text-base font-semibold">Active</div>
              </div>
            </div>
          </div>

          {editing && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  className="mt-1 w-full border p-2 rounded"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  className="mt-1 w-full border p-2 rounded"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  className="mt-1 w-full border p-2 rounded"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={saveProfile}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {activityCards.map((card) => (
              <div key={card.title} className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold">{card.title}</div>
                <div className="mt-2 text-sm text-gray-600">{card.description}</div>
              </div>
            ))}
          </div>
          {user.role === 0 || user.role === 'Student' ? renderStudentInfo() : null}
          {user.role === 1 || user.role === 'Teacher' ? renderTeacherInfo() : null}
          {(user.role === 2 || user.role === 'Admin' || user.role === 3 || user.role === 'SuperAdmin') ? renderAdminInfo() : null}
        </div>
      </div>
    </div>
  );
}
