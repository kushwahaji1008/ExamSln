import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { genExams } from '@/services/api/generated';

const defaultSettings = {
  randomizeQuestions: true,
  allowReview: true,
  showResultsImmediately: true,
  enableNegativeMarking: false,
  negativeMarkingPercentage: 0,
  requireProctoring: false,
  preventTabSwitch: false,
  enableAutoSubmit: false,
  gracePeriodMinutes: 0,
};

export default function EditExam() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState<any>(null);
  const [scheduleTime, setScheduleTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionIds, setQuestionIds] = useState('');
  const [allowedStudents, setAllowedStudents] = useState('');
  const [settings, setSettings] = useState({ ...defaultSettings });

  useEffect(() => {
    if (!examId) return;

    genExams.getExam(examId).then((data) => {
      setExam(data);
      setQuestionIds((data.questionIds || []).join(', '));
      setAllowedStudents((data.allowedStudents || []).join(', '));
      setSettings(data.settings || defaultSettings);
    }).catch(() => {});
  }, [examId]);

  if (!exam) return <div>Loading...</div>;

  const save = async () => {
    setLoading(true);
    try {
      await genExams.updateExam(examId!, {
        ...exam,
        questionIds: questionIds.split(',').map((item) => item.trim()).filter(Boolean),
        allowedStudents: allowedStudents.split(',').map((item) => item.trim()).filter(Boolean),
        settings,
      });
      alert('Exam saved');
    } catch (error) {
      alert('Failed to save exam');
    } finally {
      setLoading(false);
    }
  };

  const schedule = async () => {
    if (!scheduleTime) return alert('Set a schedule time');
    try {
      await genExams.examSchedule(examId!, { scheduledStartTime: scheduleTime });
      alert('Scheduled exam');
      setExam({ ...exam, scheduledStartTime: scheduleTime });
    } catch {
      alert('Failed to schedule');
    }
  };

  const activate = async () => {
    try {
      await genExams.activateExam(examId!);
      alert('Exam activated');
    } catch {
      alert('Failed to activate');
    }
  };

  const complete = async () => {
    try {
      await genExams.completeExam(examId!);
      alert('Exam completed');
    } catch {
      alert('Failed to complete');
    }
  };

  const remove = async () => {
    if (!confirm('Delete this exam?')) return;
    try {
      await genExams.deleteExam(examId!);
      alert('Deleted');
      navigate('/teacher/exams');
    } catch {
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Edit Exam</h1>
      <input
        className="border p-2 w-full"
        value={exam.title || ''}
        onChange={(e) => setExam({ ...exam, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        className="border p-2 w-full"
        value={exam.description || ''}
        onChange={(e) => setExam({ ...exam, description: e.target.value })}
        placeholder="Description"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2"
          type="number"
          value={exam.durationMinutes || 60}
          onChange={(e) => setExam({ ...exam, durationMinutes: Number(e.target.value) })}
          placeholder="Duration minutes"
        />
        <input
          className="border p-2"
          type="datetime-local"
          value={exam.scheduledStartTime || scheduleTime}
          onChange={(e) => {
            setScheduleTime(e.target.value);
            setExam({ ...exam, scheduledStartTime: e.target.value });
          }}
          placeholder="Scheduled start time"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <select
          className="border p-2"
          value={exam.type ?? 0}
          onChange={(e) => setExam({ ...exam, type: Number(e.target.value) })}
        >
          <option value={0}>Standard</option>
          <option value={1}>Timed</option>
          <option value={2}>Practice</option>
        </select>
        <input
          className="border p-2"
          type="number"
          value={exam.totalMarks || 100}
          onChange={(e) => setExam({ ...exam, totalMarks: Number(e.target.value) })}
          placeholder="Total marks"
        />
      </div>
      <input
        className="border p-2 w-full"
        type="number"
        value={exam.passingMarks || 50}
        onChange={(e) => setExam({ ...exam, passingMarks: Number(e.target.value) })}
        placeholder="Passing marks"
      />
      <textarea
        className="border p-2 w-full"
        value={questionIds}
        onChange={(e) => setQuestionIds(e.target.value)}
        placeholder="Question IDs (comma separated)"
      />
      <textarea
        className="border p-2 w-full"
        value={allowedStudents}
        onChange={(e) => setAllowedStudents(e.target.value)}
        placeholder="Allowed students (comma separated)"
      />
      <textarea
        className="border p-2 w-full"
        value={exam.instructionsHtml || ''}
        onChange={(e) => setExam({ ...exam, instructionsHtml: e.target.value })}
        placeholder="Instructions HTML"
      />
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.randomizeQuestions}
            onChange={(e) => setSettings({ ...settings, randomizeQuestions: e.target.checked })}
          />
          Randomize questions
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.allowReview}
            onChange={(e) => setSettings({ ...settings, allowReview: e.target.checked })}
          />
          Allow review
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.showResultsImmediately}
            onChange={(e) => setSettings({ ...settings, showResultsImmediately: e.target.checked })}
          />
          Show results immediately
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.enableNegativeMarking}
            onChange={(e) => setSettings({ ...settings, enableNegativeMarking: e.target.checked })}
          />
          Enable negative marking
        </label>
      </div>
      {settings.enableNegativeMarking && (
        <input
          className="border p-2 w-full"
          type="number"
          value={settings.negativeMarkingPercentage}
          min={0}
          max={100}
          onChange={(e) => setSettings({ ...settings, negativeMarkingPercentage: Number(e.target.value) })}
          placeholder="Negative marking %"
        />
      )}
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.requireProctoring}
            onChange={(e) => setSettings({ ...settings, requireProctoring: e.target.checked })}
          />
          Require proctoring
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.preventTabSwitch}
            onChange={(e) => setSettings({ ...settings, preventTabSwitch: e.target.checked })}
          />
          Prevent tab switch
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.enableAutoSubmit}
            onChange={(e) => setSettings({ ...settings, enableAutoSubmit: e.target.checked })}
          />
          Enable auto submit
        </label>
        <input
          className="border p-2"
          type="number"
          value={settings.gracePeriodMinutes}
          min={0}
          onChange={(e) => setSettings({ ...settings, gracePeriodMinutes: Number(e.target.value) })}
          placeholder="Grace period minutes"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          className="bg-green-600 text-white p-2 rounded"
          onClick={save}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Exam'}
        </button>
        <button
          className="bg-red-600 text-white p-2 rounded"
          onClick={remove}
        >
          Delete Exam
        </button>
      </div>
      <div className="space-y-2 border-t pt-4">
        <label className="block text-sm font-medium">Schedule Start Time</label>
        <input
          className="border p-2 w-full"
          type="datetime-local"
          value={scheduleTime || exam.scheduledStartTime || ''}
          onChange={(e) => setScheduleTime(e.target.value)}
        />
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white p-2 rounded" onClick={schedule}>Schedule</button>
          <button className="bg-yellow-500 text-white p-2 rounded" onClick={activate}>Activate</button>
          <button className="bg-gray-700 text-white p-2 rounded" onClick={complete}>Complete</button>
        </div>
      </div>
    </div>
  );
}
