import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { genQuestions } from '@/services/api/generated';

const createEmptyOption = () => ({ id: crypto.randomUUID?.() ?? String(Date.now()), text: '', imageUrl: '' });

export default function EditQuestion() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<any>(null);
  const [correctOptions, setCorrectOptions] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!questionId) return;
    genQuestions.getQuestion(questionId).then((data) => {
      setQuestion(data);
      setCorrectOptions((data.correctOptions || []).join(', '));
    }).catch(() => {});
  }, [questionId]);

  if (!question) return <div>Loading...</div>;

  const updateOption = (id: string, field: 'text' | 'imageUrl', value: string) =>
    setQuestion((prev: any) => ({
      ...prev,
      options: prev.options.map((option: any) => (option.id === id ? { ...option, [field]: value } : option)),
    }));

  const addOption = () =>
    setQuestion((prev: any) => ({
      ...prev,
      options: [...(prev.options || []), createEmptyOption()],
    }));

  const removeOption = (id: string) =>
    setQuestion((prev: any) => ({
      ...prev,
      options: (prev.options || []).filter((option: any) => option.id !== id),
    }));

  const save = async () => {
    setLoading(true);
    try {
      await genQuestions.updateQuestion(questionId!, {
        ...question,
        correctOptions: correctOptions.split(',').map((item) => item.trim()).filter(Boolean),
      });
      alert('Question saved');
      navigate('/teacher/questions');
    } catch {
      alert('Failed to save question');
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async () => {
    if (!confirm('Delete this question?')) return;
    try {
      await genQuestions.deleteQuestion(questionId!);
      alert('Question deleted');
      navigate('/teacher/questions');
    } catch {
      alert('Failed to delete question');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Edit Question</h1>
      <textarea
        className="border p-2 w-full"
        value={question.questionText || ''}
        onChange={(e) => setQuestion({ ...question, questionText: e.target.value })}
        placeholder="Question text"
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          className="border p-2 w-full"
          value={question.type ?? 0}
          onChange={(e) => setQuestion({ ...question, type: Number(e.target.value) })}
        >
          <option value={0}>Single Choice</option>
          <option value={1}>Multiple Choice</option>
          <option value={2}>Open Response</option>
        </select>
        <input
          className="border p-2 w-full"
          type="number"
          min={0}
          value={question.marks || 0}
          onChange={(e) => setQuestion({ ...question, marks: Number(e.target.value) })}
          placeholder="Marks"
        />
      </div>

      {question.type !== 2 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Options</h2>
            <button type="button" className="text-blue-600" onClick={addOption}>
              Add option
            </button>
          </div>
          {(question.options || []).map((option: any, index: number) => (
            <div key={option.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-5">
                <input
                  className="border p-2 w-full"
                  value={option.text}
                  onChange={(e) => updateOption(option.id, 'text', e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
              </div>
              <div className="col-span-5">
                <input
                  className="border p-2 w-full"
                  value={option.imageUrl || ''}
                  onChange={(e) => updateOption(option.id, 'imageUrl', e.target.value)}
                  placeholder="Image URL (optional)"
                />
              </div>
              <button type="button" className="col-span-2 text-red-600" onClick={() => removeOption(option.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {question.type === 0 && (
        <input
          className="border p-2 w-full"
          value={question.correctAnswer || ''}
          onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
          placeholder="Correct answer"
        />
      )}

      {question.type === 1 && (
        <input
          className="border p-2 w-full"
          value={correctOptions}
          onChange={(e) => setCorrectOptions(e.target.value)}
          placeholder="Correct options (comma separated)"
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 w-full"
          value={question.category || ''}
          onChange={(e) => setQuestion({ ...question, category: e.target.value })}
          placeholder="Category"
        />
        <input
          className="border p-2 w-full"
          value={(question.tags || []).join(', ')}
          onChange={(e) => setQuestion({ ...question, tags: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) })}
          placeholder="Tags (comma separated)"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 w-full"
          type="number"
          min={0}
          value={question.negativeMarks || 0}
          onChange={(e) => setQuestion({ ...question, negativeMarks: Number(e.target.value) })}
          placeholder="Negative marks"
        />
        <input
          className="border p-2 w-full"
          type="number"
          min={1}
          value={question.difficulty || 1}
          onChange={(e) => setQuestion({ ...question, difficulty: Number(e.target.value) })}
          placeholder="Difficulty"
        />
      </div>

      <textarea
        className="border p-2 w-full"
        value={question.explanation || ''}
        onChange={(e) => setQuestion({ ...question, explanation: e.target.value })}
        placeholder="Explanation"
      />

      <input
        className="border p-2 w-full"
        value={question.imageUrl || ''}
        onChange={(e) => setQuestion({ ...question, imageUrl: e.target.value })}
        placeholder="Image URL"
      />

      <textarea
        className="border p-2 w-full"
        value={question.codeSnippet || ''}
        onChange={(e) => setQuestion({ ...question, codeSnippet: e.target.value })}
        placeholder="Code snippet"
      />

      <div className="flex gap-2">
        <button
          className="bg-green-600 text-primary-foreground p-2 rounded"
          onClick={save}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Question'}
        </button>
        <button className="bg-red-600 text-primary-foreground p-2 rounded" onClick={deleteQuestion}>
          Delete Question
        </button>
      </div>
    </div>
  );
}
