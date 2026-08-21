import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { genQuestions } from '@/services/api/generated';
import PageHeader from '@/components/ui/PageHeader';

export default function QuestionsList() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const data = await genQuestions.listQuestions();
      setQuestions(data || []);
    } catch {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const remove = async (questionId: string) => {
    if (!confirm('Delete this question?')) return;
    try {
      await genQuestions.deleteQuestion(questionId);
      loadQuestions();
    } catch {
      alert('Failed to delete question');
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Question Bank" subtitle="Manage your question library with rich cards, quick actions, and live status indicators." />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">Create new questions and edit existing ones with ease.</p>
        <Link className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-indigo-500" to="/teacher/questions/create">
          + Create Question
        </Link>
      </div>

      {loading ? (
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center text-slate-500 shadow-sm">
          Loading questions...
        </div>
      ) : questions.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 shadow-sm">
          No questions available yet.
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {questions.map((question) => (
            <div key={question.id} className="group rounded-[2rem] border border-slate-200 bg-card p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-indigo-100/40">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{question.questionText || 'Untitled question'}</h2>
                  <p className="mt-2 text-sm text-slate-500">{question.excerpt || 'Question summary unavailable.'}</p>
                </div>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                  {question.type ?? 'General'}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">
                <span className="rounded-2xl bg-slate-100 px-3 py-2">Category: {question.category || 'None'}</span>
                <span className="rounded-2xl bg-slate-100 px-3 py-2">Difficulty: {question.difficulty ?? 'N/A'}</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="text-indigo-600 font-medium transition hover:text-indigo-500" to={`/teacher/questions/${question.id}/edit`}>
                  Edit
                </Link>
                <button className="text-rose-600 transition hover:text-rose-500" onClick={() => remove(question.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
