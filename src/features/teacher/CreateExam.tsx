import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function CreateExam() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [scheduledStartTime, setScheduledStartTime] = useState('');
  const [type, setType] = useState(0);
  const [questionIds, setQuestionIds] = useState('');
  const [settings, setSettings] = useState({ ...defaultSettings });
  const [totalMarks, setTotalMarks] = useState(100);
  const [passingMarks, setPassingMarks] = useState(50);
  const [allowedStudents, setAllowedStudents] = useState('');
  const [instructionsHtml, setInstructionsHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const create = async () => {
    if (!title.trim()) return alert('Title is required');
    setLoading(true);
    try {
      await genExams.createExam({
        title,
        description,
        durationMinutes,
        scheduledStartTime: scheduledStartTime || undefined,
        type,
        questionIds: questionIds.split(',').map((item) => item.trim()).filter(Boolean),
        settings,
        totalMarks,
        passingMarks,
        allowedStudents: allowedStudents.split(',').map((item) => item.trim()).filter(Boolean),
        instructionsHtml,
      });
      alert('Exam created');
      navigate('/teacher/exams');
    } catch (e) {
      alert('Failed to create exam');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Create Exam</h1>
      <input
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className="border p-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2"
          type="number"
          value={durationMinutes}
          min={1}
          onChange={(e) => setDurationMinutes(Number(e.target.value))}
          placeholder="Duration minutes"
        />
        <input
          className="border p-2"
          type="datetime-local"
          value={scheduledStartTime}
          onChange={(e) => setScheduledStartTime(e.target.value)}
          placeholder="Scheduled start time"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <select
          className="border p-2"
          value={type}
          onChange={(e) => setType(Number(e.target.value))}
        >
          <option value={0}>Standard</option>
          <option value={1}>Timed</option>
          <option value={2}>Practice</option>
        </select>
        <input
          className="border p-2"
          type="number"
          value={totalMarks}
          min={0}
          onChange={(e) => setTotalMarks(Number(e.target.value))}
          placeholder="Total marks"
        />
      </div>
      <input
        className="border p-2 w-full"
        type="number"
        value={passingMarks}
        min={0}
        onChange={(e) => setPassingMarks(Number(e.target.value))}
        placeholder="Passing marks"
      />
      <textarea
        className="border p-2 w-full"
        value={questionIds}
        onChange={(e) => setQuestionIds(e.target.value)}
        placeholder="Question IDs (comma separated)"
      />
      <div className="grid grid-cols-2 gap-4">
        <textarea
          className="border p-2"
          value={allowedStudents}
          onChange={(e) => setAllowedStudents(e.target.value)}
          placeholder="Allowed students (emails or ids, comma separated)"
        />
        <textarea
          className="border p-2"
          value={instructionsHtml}
          onChange={(e) => setInstructionsHtml(e.target.value)}
          placeholder="Instructions HTML"
        />
      </div>
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
      <button
        className="bg-blue-600 text-white p-2 rounded"
        onClick={create}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Exam'}
      </button>
    </div>
  );
}
