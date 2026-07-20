import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { genExams, genAttempts } from '@/services/api/generated';

export default function ExamDetails() {
  const { examId } = useParams();
  const [exam, setExam] = useState<any>(null);
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!examId) return;
    genExams.getExam(examId).then(setExam).catch(() => {});
    genAttempts.isExamActive(examId).then((response) => {
      setIsActive(Boolean(response?.isActive ?? response));
    }).catch(() => setIsActive(false));
  }, [examId]);

  if (!exam) return <div>Loading exam...</div>;

  const start = async () => {
    if (!examId) return;
    setLoading(true);
    try {
      const res = await genAttempts.startAttempt({ examId });
      const attemptId = res?.attemptId || res?.id;
      if (attemptId) navigate(`/attempts/${attemptId}`);
      else alert('Unable to start exam.');
    } catch {
      alert('Failed to start exam');
    } finally {
      setLoading(false);
    }
  };

  const examStatus = exam.status || 'Unknown';
  const canStart = isActive && examStatus !== 'completed' && examStatus !== 'expired';

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{exam.title}</h1>
      <div className="text-gray-600">Duration: {exam.durationMinutes || 'N/A'} minutes</div>
      <div className="text-gray-600">Total Marks: {exam.totalMarks || 'N/A'}</div>
      <div className="text-gray-600">Status: {examStatus}</div>
      <div className="text-gray-600">Active: {isActive === null ? 'Checking...' : isActive ? 'Yes' : 'No'}</div>
      <div className="mt-4 whitespace-pre-line">{exam.description || 'No description provided.'}</div>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={start}
        disabled={!canStart || loading}
      >
        {loading ? 'Starting...' : canStart ? 'Start Exam' : 'Exam not available'}
      </button>
    </div>
  );
}
