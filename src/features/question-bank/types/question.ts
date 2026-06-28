export type Difficulty = "Easy" | "Medium" | "Hard";

export type QuestionType =
  | "MCQ"
  | "MSQ"
  | "TrueFalse"
  | "Numerical";

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;

  subject: string;

  topic: string;

  chapter: string;

  difficulty: Difficulty;

  type: QuestionType;

  questionText: string;

  options: Option[];

  correctAnswers: string[];

  explanation: string;

  marks: number;

  negativeMarks: number;

  createdBy: string;

  createdAt: string;
}
