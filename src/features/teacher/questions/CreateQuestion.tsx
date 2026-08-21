import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { genQuestions } from '@/services/api/generated';

const createEmptyOption = () => ({ id: crypto.randomUUID?.() ?? String(Date.now()), text: '', imageUrl: '' });

export default function CreateQuestion() {
  const [questionText, setQuestionText] = useState('');
  const [type, setType] = useState(0);
  const [options, setOptions] = useState([{ ...createEmptyOption() }]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [correctOptions, setCorrectOptions] = useState('');
  const [marks, setMarks] = useState(1);
  const [negativeMarks, setNegativeMarks] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [explanation, setExplanation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addOption = () => setOptions((prev) => [...prev, { ...createEmptyOption() }]);
  const updateOption = (id: string, field: 'text' | 'imageUrl', value: string) =>
    setOptions((prev) => prev.map((option) => (option.id === id ? { ...option, [field]: value } : option)));
  const removeOption = (id: string) => setOptions((prev) => prev.filter((option) => option.id !== id));

  const create = async () => {
    if (!questionText.trim()) return alert('Question text is required');
    const payload = {
      questionText,
      type,
      options: type !== 2 ? options.filter((option) => option.text.trim()) : [],
      correctAnswer: type === 0 ? correctAnswer : undefined,
      correctOptions: type === 1 ? correctOptions.split(',').map((item) => item.trim()).filter(Boolean) : [],
      marks,
      negativeMarks,
      difficulty,
      category,
      tags: tags.split(',').map((item) => item.trim()).filter(Boolean),
      explanation,
      imageUrl,
      codeSnippet,
    };

    setLoading(true);
    try {
      await genQuestions.createQuestion(payload);
      alert('Question created');
      navigate('/teacher/questions');
    } catch {
      alert('Failed to create question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Create Question</h1>
      <textarea
        className="border p-2 w-full"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Question text"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Question Type</label>
          <select
            className="border p-2 w-full"
            value={type}
            onChange={(e) => setType(Number(e.target.value))}
          >
            <option value={0}>Single Choice</option>
            <option value={1}>Multiple Choice</option>
            <option value={2}>Open Response</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Marks</label>
          <input
            className="border p-2 w-full"
            type="number"
            min={0}
            value={marks}
            onChange={(e) => setMarks(Number(e.target.value))}
          />
        </div>
      </div>

      {type !== 2 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Options</h2>
            <button type="button" className="text-blue-600" onClick={addOption}>
              Add option
            </button>
          </div>
          {options.map((option, index) => (
            <div key={option.id} className="grid grid-cols-12 gap-2 items-start">
              <div className="col-span-5 space-y-1">
                <label className="text-sm font-medium">Option {index + 1} text</label>
                <input
                  className="border p-2 w-full"
                  value={option.text}
                  onChange={(e) => updateOption(option.id, 'text', e.target.value)}
                  placeholder={`Option ${index + 1} text`}
                />
              </div>
              <div className="col-span-5 space-y-1">
                <label className="text-sm font-medium">Option {index + 1} image</label>
                <input
                  className="border p-2 w-full"
                  value={option.imageUrl}
                  onChange={(e) => updateOption(option.id, 'imageUrl', e.target.value)}
                  placeholder="Image URL (optional)"
                />
              </div>
              <button type="button" className="col-span-2 text-red-600 mt-7" onClick={() => removeOption(option.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {type === 0 && (
        <input
          className="border p-2 w-full"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="Correct answer"
        />
      )}

      {type === 1 && (
        <input
          className="border p-2 w-full"
          value={correctOptions}
          onChange={(e) => setCorrectOptions(e.target.value)}
          placeholder="Correct option values (comma separated)"
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          className="border p-2 w-full"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 w-full"
          type="number"
          min={0}
          value={negativeMarks}
          onChange={(e) => setNegativeMarks(Number(e.target.value))}
          placeholder="Negative marks"
        />
        <input
          className="border p-2 w-full"
          type="number"
          min={1}
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          placeholder="Difficulty"
        />
      </div>

      <textarea
        className="border p-2 w-full"
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        placeholder="Explanation"
      />

      <input
        className="border p-2 w-full"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />

      <textarea
        className="border p-2 w-full"
        value={codeSnippet}
        onChange={(e) => setCodeSnippet(e.target.value)}
        placeholder="Code snippet"
      />

      <button
        className="bg-blue-600 text-primary-foreground p-2 rounded"
        onClick={create}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Question'}
      </button>
    </div>
  );
}
