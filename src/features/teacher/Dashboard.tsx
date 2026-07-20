import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  ClipboardList,
  BookOpen,
  FileText,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { fetchTeacherExams, fetchQuestions } from "./api";

export default function TeacherDashboard() {
  const { data: exams = [], isLoading: loadingExams } = useQuery({
    queryKey: ["teacher-exams"],
    queryFn: fetchTeacherExams,
  });

  const { data: questions = [], isLoading: loadingQuestions } = useQuery({
    queryKey: ["teacher-questions"],
    queryFn: fetchQuestions,
  });

  const activeExamCount = useMemo(
    () =>
      Array.isArray(exams)
        ? exams.filter((exam: any) => exam.status === "active" || exam.isActive || exam.isPublished).length
        : 0,
    [exams]
  );

  const scheduledExamCount = useMemo(
    () =>
      Array.isArray(exams)
        ? exams.filter((exam: any) => exam.status === "scheduled" || exam.startDate || exam.scheduledAt).length
        : 0,
    [exams]
  );

  const liveActions = useMemo(
    () => [
      { label: "Review drafts", value: exams.filter((exam: any) => exam.status === "draft").length, tone: "bg-slate-50 text-slate-900" },
      { label: "Publish exams", value: scheduledExamCount, tone: "bg-sky-50 text-sky-700" },
      { label: "Active now", value: activeExamCount, tone: "bg-emerald-50 text-emerald-700" },
    ],
    [activeExamCount, scheduledExamCount, exams]
  );

  return (
    <div className="space-y-10">
      <PageHeader
        title="Teacher Dashboard"
        subtitle="Keep exams on schedule, update questions quickly, and see the most important teaching metrics at a glance."
      />

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 text-white shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-slate-200">
                <Sparkles size={14} /> Teaching pulse
              </span>
              <h2 className="text-4xl font-semibold tracking-tight">Your classroom workflow, simplified.</h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">
                Use this dashboard to manage active exams, refine your question bank, and keep your students moving forward smoothly.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Question bank</p>
              <p className="mt-4 text-4xl font-semibold text-white">{Array.isArray(questions) ? questions.length : 0}</p>
              <p className="text-sm text-slate-300">Items ready to assign</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Live actions</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Stay ahead</h3>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Manage exams
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="mt-5 grid gap-4">
            {liveActions.map((action) => (
              <div key={action.label} className={`rounded-2xl p-4 ${action.tone}`}>
                <p className="text-sm text-slate-500">{action.label}</p>
                <p className="mt-2 text-3xl font-semibold">{action.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between text-slate-500">
            <span>Exams</span>
            <BookOpen size={20} />
          </div>
          <div className="mt-4 text-4xl font-semibold text-slate-900">{Array.isArray(exams) ? exams.length : 0}</div>
          <p className="mt-2 text-sm text-slate-500">Total exams created</p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between text-slate-500">
            <span>Questions</span>
            <ClipboardList size={20} />
          </div>
          <div className="mt-4 text-4xl font-semibold text-slate-900">{Array.isArray(questions) ? questions.length : 0}</div>
          <p className="mt-2 text-sm text-slate-500">Items in your bank</p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between text-slate-500">
            <span>Active exams</span>
            <AlertTriangle size={20} />
          </div>
          <div className="mt-4 text-4xl font-semibold text-slate-900">{activeExamCount}</div>
          <p className="mt-2 text-sm text-slate-500">Published or live exams</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Recent Exams</h2>
              <p className="text-sm text-slate-500">Latest exam updates</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">{loadingExams ? "Loading" : `${Array.isArray(exams) ? exams.length : 0} total`}</span>
          </div>
          {loadingExams ? (
            <div className="rounded-[1.5rem] border border-dashed border-slate-200 p-6 text-center text-slate-500">Loading exam list...</div>
          ) : (
            <div className="space-y-4">
              {(Array.isArray(exams) ? exams : []).slice(0, 6).map((exam: any) => (
                <div key={exam.id ?? exam.title} className="rounded-[1.5rem] border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/40">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-slate-900">{exam.title ?? exam.name ?? "Untitled exam"}</h3>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">{exam.status ?? "Draft"}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{exam.shortDescription ?? "Manage exam questions and schedule."}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Question Bank</h2>
              <p className="text-sm text-slate-500">Recent question activity</p>
            </div>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">{loadingQuestions ? "Loading" : `${Array.isArray(questions) ? questions.length : 0}`}</span>
          </div>
          {loadingQuestions ? (
            <div className="rounded-[1.5rem] border border-dashed border-slate-200 p-6 text-center text-slate-500">Loading questions...</div>
          ) : (
            <div className="space-y-4">
              {(Array.isArray(questions) ? questions : []).slice(0, 6).map((question: any) => (
                <div key={question.id} className="rounded-[1.5rem] border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-sky-50/40">
                  <h3 className="font-semibold text-slate-900">{question.questionText ?? question.title ?? "Untitled question"}</h3>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-500">
                    <span className="rounded-full bg-slate-100 px-3 py-1">Type: {question.type ?? question.questionType ?? "N/A"}</span>
                    {question.category && <span className="rounded-full bg-slate-100 px-3 py-1">{question.category}</span>}
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
