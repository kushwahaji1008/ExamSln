import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, Flag, Send, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { genAttempts } from '@/services/api/generated';

type AnswerState = {
  selectedOption?: string;
  selectedOptions?: string[];
  textAnswer?: string;
  codeAnswer?: string;
  flagged?: boolean;
};

export default function AttemptRunner() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [answerState, setAnswerState] = useState<Record<string, AnswerState>>({});
  const [savingQuestion, setSavingQuestion] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadAttempt = async () => {
    if (!attemptId) return;
    setLoading(true);
    try {
      const result = await genAttempts.getAttempt(attemptId);
      setAttempt(result);
      if (result?.questions || result?.items) {
        const items = result.questions || result.items;
        const nextState: Record<string, AnswerState> = {};
        items.forEach((question: any) => {
          const id = question.questionId || question.id;
          if (!id) return;
          nextState[id] = {
            selectedOption: question.selectedOption ?? question.answer?.selectedOption,
            selectedOptions: question.selectedOptions ?? question.answer?.selectedOptions ?? [],
            textAnswer: question.textAnswer ?? question.answer?.textAnswer ?? '',
            codeAnswer: question.codeAnswer ?? question.answer?.codeAnswer ?? '',
            flagged: question.flagged ?? false,
          };
        });
        setAnswerState(nextState);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttempt();
  }, [attemptId]);

  // keep a ref to the latest answers so the autosave interval can read up-to-date data
  const answersRef = useRef<Record<string, AnswerState>>(answerState);
  useEffect(() => {
    answersRef.current = answerState;
  }, [answerState]);

  useEffect(() => {
    if (!attemptId) return;

    const intervalMs = 30000; // autosave every 30s
    const interval = setInterval(async () => {
      try {
        // send a lightweight autosave log with the latest answers snapshot
        await genAttempts.logActivity(attemptId, {
          event: 'autosave',
          answers: answersRef.current,
          timestamp: Date.now(),
        });
      } catch (err) {
        // don't block on autosave errors
      }
    }, intervalMs);

    const handleBeforeUnload = () => {
      try {
        // best-effort final log on unload; ignore result
        genAttempts.logActivity(attemptId, {
          event: 'autosave_unload',
          answers: answersRef.current,
          timestamp: Date.now(),
        });
      } catch {}
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [attemptId]);

  const questions = useMemo(() => attempt?.questions || attempt?.items || [], [attempt]);
  const canSubmitExam = attempt && attempt.status !== 'submitted' && attempt.status !== 'completed';

  const updateAnswer = (questionId: string, values: Partial<AnswerState>) => {
    setAnswerState((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        ...values,
      },
    }));
  };

  const handleSubmitAnswer = async (question: any) => {
    const questionId = question.questionId || question.id;
    if (!attemptId || !questionId) return;
    const state = answerState[questionId];
    if (!state) return;

    const payload: any = { questionId };
    if (state.selectedOptions && state.selectedOptions.length > 0) payload.selectedOptions = state.selectedOptions;
    if (state.selectedOption) payload.selectedOption = state.selectedOption;
    if (state.textAnswer) payload.textAnswer = state.textAnswer;
    if (state.codeAnswer) payload.codeAnswer = state.codeAnswer;

    setSavingQuestion(questionId);
    try {
      await genAttempts.submitAnswer(attemptId, payload);
      await genAttempts.logActivity(attemptId, { event: 'submit_answer', questionId });
      await loadAttempt();
    } catch (error) {
      alert('Unable to submit the answer.');
    } finally {
      setSavingQuestion(null);
    }
  };

  const handleToggleFlag = async (question: any) => {
    const questionId = question.questionId || question.id;
    if (!attemptId || !questionId) return;
    const flagged = !Boolean(answerState[questionId]?.flagged);
    updateAnswer(questionId, { flagged });

    try {
      await genAttempts.flagQuestion(attemptId, questionId, flagged);
      await genAttempts.logActivity(attemptId, { event: 'flag_question', questionId, flagged });
    } catch {
      alert('Unable to update flag status.');
    }
  };

  const handleSubmitExam = async () => {
    if (!attemptId) return;
    setSubmitting(true);
    try {
      await genAttempts.submitExam({ attemptId });
      await genAttempts.logActivity(attemptId, { event: 'submit_attempt' });
      navigate('/student/attempts');
    } catch {
      alert('Unable to submit the exam.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-card p-8 text-slate-500">Loading attempt details...</div>;
  }

  if (!attempt) {
    return <div className="rounded-3xl border border-slate-200 bg-card p-8 text-slate-500">Could not load the attempt.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Attempt</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{attempt.id}</h1>
            <p className="mt-2 text-sm text-slate-500">Status: {attempt.status ?? 'Unknown'}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            Exam: {attempt.exam?.title ?? attempt.examTitle ?? 'Unknown exam'}
          </div>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
          No questions are available for this attempt.
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((question: any, index: number) => {
            const questionId = question.questionId || question.id || `${index}`;
            const state = answerState[questionId] ?? {};
            const options = question.options || question.choices || [];
            const isMulti = question.type === 'multiple' || question.questionType === 'multiple-choice' || question.questionType === 'multiple';
            const isCode = question.type === 'code' || question.questionType === 'code';
            const isText = question.type === 'text' || question.questionType === 'essay' || question.questionType === 'written';

            return (
              <div key={questionId} className="rounded-3xl border border-slate-200 bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Question {index + 1}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{question.questionText ?? question.title ?? 'Untitled question'}</p>
                    {question.description && <p className="mt-2 text-sm text-slate-500">{question.description}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleFlag(question)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${state.flagged ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}
                  >
                    <Flag size={16} />
                    {state.flagged ? 'Flagged' : 'Flag question'}
                  </button>
                </div>

                {options.length > 0 ? (
                  <div className="mt-6 grid gap-3">
                    {options.map((option: any) => {
                      const value = option.value ?? option.id ?? option;
                      const label = option.label ?? option.text ?? option;

                      if (isMulti) {
                        const checked = state.selectedOptions?.includes(value) ?? false;
                        return (
                          <label key={value} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition hover:border-slate-300">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {
                                const next = new Set(state.selectedOptions || []);
                                if (checked) next.delete(value);
                                else next.add(value);
                                updateAnswer(questionId, { selectedOptions: Array.from(next) });
                              }}
                              className="h-4 w-4 accent-blue-600"
                            />
                            <span>{label}</span>
                          </label>
                        );
                      }

                      return (
                        <label key={value} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition hover:border-slate-300">
                          <input
                            type="radio"
                            name={`question-${questionId}`}
                            value={value}
                            checked={state.selectedOption === value}
                            onChange={() => updateAnswer(questionId, { selectedOption: value })}
                            className="h-4 w-4 accent-blue-600"
                          />
                          <span>{label}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : isCode ? (
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-slate-700">Your answer</label>
                    <textarea
                      rows={8}
                      className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                      value={state.codeAnswer || ''}
                      onChange={(event) => updateAnswer(questionId, { codeAnswer: event.target.value })}
                    />
                  </div>
                ) : (
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-slate-700">Your answer</label>
                    <textarea
                      rows={4}
                      className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                      value={state.textAnswer || ''}
                      onChange={(event) => updateAnswer(questionId, { textAnswer: event.target.value })}
                    />
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSubmitAnswer(question)}
                    disabled={savingQuestion === questionId}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    <Send size={16} />
                    {savingQuestion === questionId ? 'Saving...' : 'Save answer'}
                  </button>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} />
                    {question.status ?? 'Not graded'}
                  </span>
                </div>
              </div>
            );
          })}

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Ready to submit</p>
                <p className="mt-2 text-sm text-slate-500">Submit the full attempt when you are finished answering every question.</p>
              </div>
              <button
                type="button"
                onClick={handleSubmitExam}
                disabled={!canSubmitExam || submitting}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {submitting ? 'Submitting...' : 'Submit attempt'}
              </button>
            </div>
            {!canSubmitExam && (
              <p className="mt-4 text-sm text-amber-700">This attempt has already been submitted or completed.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
