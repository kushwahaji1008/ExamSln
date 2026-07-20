import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { genExams } from '@/services/api/generated';

export default function TeacherExamDetails() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState<any>(null);
  const [scheduleTime, setScheduleTime] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!examId) return;
    genExams.getExam(examId).then(setExam).catch(() => {});
  }, [examId]);

  if (!exam) return <div>Loading...</div>;

  const schedule = async () => {
    if (!scheduleTime) return alert('Set a schedule time');
    setLoading(true);
    try {
      await genExams.examSchedule(examId!, { startTime: scheduleTime });
      alert('Exam scheduled');
      setExam({ ...exam, scheduledAt: scheduleTime });
    } catch {
      alert('Failed to schedule exam');
    } finally {
      setLoading(false);
    }
  };

  const activate = async () => {
    setLoading(true);
    try {
      await genExams.activateExam(examId!);
      alert('Exam activated');
    } catch {
      alert('Failed to activate exam');
    } finally {
      setLoading(false);
    }
  };

  const complete = async () => {
    setLoading(true);
    try {
      await genExams.completeExam(examId!);
      alert('Exam completed');
    } catch {
      alert('Failed to complete exam');
    } finally {
      setLoading(false);
    }
  };

  const edit = () => navigate(`/teacher/exams/${examId}/edit`);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{exam.title || 'Exam Details'}</h1>
          <div className="text-sm text-gray-600">Duration: {exam.durationMinutes || 'N/A'} minutes</div>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={edit}>
          Edit
        </button>
      </div>

      <div className="space-y-2">
        <div>{exam.description || 'No description provided.'}</div>
        <div className="text-sm text-gray-600">Status: {exam.status || 'Unknown'}</div>
        <div className="text-sm text-gray-600">Scheduled at: {exam.scheduledAt || 'Not scheduled'}</div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={schedule}
          disabled={loading}
        >
          Schedule
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={activate}
          disabled={loading}
        >
          Activate
        </button>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded"
          onClick={complete}
          disabled={loading}
        >
          Complete
        </button>
      </div>

      <div className="space-y-2">
        <label className="font-medium">Start time</label>
        <input
          className="border p-2 w-full"
          type="datetime-local"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
        />
      </div>
    </div>
  );
}
