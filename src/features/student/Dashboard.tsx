import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  FileText,
  GraduationCap,
  Clock,
  Trophy,
  Calendar,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { fetchCourses, fetchStudentExams, fetchMyAttempts } from "./api";

const metricItems = [
  {
    title: "Enrolled Courses",
    icon: BookOpen,
    color: "bg-sky-100 text-sky-600",
  },
  {
    title: "Upcoming Exams",
    icon: FileText,
    color: "bg-rose-100 text-rose-600",
  },
  {
    title: "Completed Courses",
    icon: GraduationCap,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Study Hours",
    icon: Clock,
    color: "bg-amber-100 text-amber-700",
  },
];

export default function StudentDashboard() {
  const { data: courses = [], isLoading: loadingCourses } = useQuery({
    queryKey: ["student-courses"],
    queryFn: fetchCourses,
  });

  const { data: exams = [], isLoading: loadingExams } = useQuery({
    queryKey: ["student-upcoming-exams"],
    queryFn: fetchStudentExams,
  });

  const { data: attempts = [], isLoading: loadingAttempts } = useQuery({
    queryKey: ["student-attempts"],
    queryFn: fetchMyAttempts,
  });

  const courseCount = Array.isArray(courses) ? courses.length : 0;
  const upcomingExamCount = Array.isArray(exams) ? exams.length : 0;
  const completedCourseCount = Array.isArray(courses)
    ? courses.filter((course: any) => course.completed || course.progress >= 100).length
    : 0;
  const studyHours = Array.isArray(courses)
    ? courses.reduce((sum: number, course: any) => sum + (Number(course.studyHours) || 0), 0)
    : 0;

  const latestCourse = Array.isArray(courses) && courses.length > 0 ? courses[0] : null;
  const latestExam = Array.isArray(exams) && exams.length > 0 ? exams[0] : null;
  const latestAttempt = Array.isArray(attempts) && attempts.length > 0 ? attempts[0] : null;

  const spotlight = useMemo(
    () => ({
      title: latestCourse?.title || latestExam?.title || "Start learning now",
      subtitle: latestCourse
        ? `Continue ${latestCourse.title}`
        : latestExam
        ? `Next exam: ${latestExam.title}`
        : "Explore new courses and exams.",
      action: latestCourse ? "View course" : latestExam ? "View exam" : "Browse courses",
    }),
    [latestCourse, latestExam]
  );

  return (
    <div className="space-y-10">
      <PageHeader
        title="Student Dashboard"
        subtitle="Your learning progress, upcoming exams, and course status in one beautiful experience."
      />

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 text-white shadow-2xl shadow-slate-950/40">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-slate-200">
                <Sparkles size={14} /> Progress update
              </span>
              <h2 className="text-4xl font-semibold tracking-tight">Keep the momentum going.</h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">
                You have {courseCount} active course{courseCount === 1 ? "" : "s"} and {upcomingExamCount} upcoming exam{upcomingExamCount === 1 ? "" : "s"}. Stay focused with the latest tasks and checkpoints.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Overall progress</p>
              <p className="mt-4 text-4xl font-semibold text-white">{completedCourseCount}/{courseCount || 1}</p>
              <p className="text-sm text-slate-300">Courses completed</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Spotlight</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">{spotlight.title}</h3>
            </div>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Today</span>
          </div>
          <p className="mt-4 text-sm text-slate-600">{spotlight.subtitle}</p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            {spotlight.action}
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-4">
        {metricItems.map((item) => {
          const value =
            item.title === "Enrolled Courses"
              ? courseCount
              : item.title === "Upcoming Exams"
              ? upcomingExamCount
              : item.title === "Completed Courses"
              ? completedCourseCount
              : studyHours;

          return (
            <div key={item.title} className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-sky-200/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.title}</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
                </div>
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <item.icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Continue Learning</h2>
              <p className="text-sm text-slate-500">Resume the courses where you left off.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">{courseCount} courses</span>
          </div>

          {loadingCourses ? (
            <div className="rounded-[1.5rem] border border-dashed border-slate-200 p-8 text-center text-slate-500">Loading courses...</div>
          ) : (
            <div className="space-y-4">
              {(Array.isArray(courses) ? courses : []).slice(0, 5).map((course: any) => (
                <div key={course.id ?? course.title} className="rounded-[1.5rem] border border-slate-200 p-5 transition hover:border-sky-300 hover:shadow-sky-100/40">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{course.title ?? course.name ?? "Untitled course"}</h3>
                      <p className="mt-2 text-sm text-slate-500">{course.description ?? "Continue your learning path."}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">{course.progress ? `${course.progress}%` : "No progress"}</span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div style={{ width: `${Math.min(100, Number(course.progress) || 0)}%` }} className="h-3 rounded-full bg-sky-600" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-900/5">
          <h2 className="text-xl font-semibold text-slate-900">Upcoming Exams</h2>
          <p className="mt-2 text-sm text-slate-500">Stay ready for your next test.</p>

          <div className="mt-6 space-y-4">
            {loadingExams ? (
              <div className="rounded-[1.5rem] border border-dashed border-slate-200 p-6 text-center text-slate-500">Loading exams...</div>
            ) : (
              (Array.isArray(exams) ? exams : []).slice(0, 5).map((exam: any) => (
                <div key={exam.id ?? exam.title} className="rounded-[1.5rem] border border-slate-200 p-4 transition hover:border-rose-300 hover:bg-rose-50/40">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{exam.title ?? exam.name ?? "Untitled exam"}</h3>
                      <p className="mt-1 text-sm text-slate-500">{exam.date ?? exam.scheduledAt ?? "No date set"}</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-rose-700">{exam.status ?? "Open"}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
            <span className="text-sm text-slate-500">{loadingAttempts ? "Loading..." : `${Array.isArray(attempts) ? attempts.length : 0} attempts`}</span>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Last course</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">{latestCourse?.title ?? latestCourse?.name ?? "No recent course"}</p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Latest attempt</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">{latestAttempt?.examTitle ?? latestAttempt?.exam?.title ?? latestAttempt?.status ?? "No attempts yet"}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Achievement</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Stay on track</h3>
            </div>
          </div>
          <p className="mt-4 text-slate-600">Continue your learning streak by completing another course or exam today.</p>
          <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-5 text-sm text-slate-600">
            You&apos;re doing great. Keep reviewing your practice exams and focus on weak topics to maintain your progress.
          </div>
        </div>
      </div>
    </div>
  );
}
