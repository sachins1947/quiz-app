export interface Question {
  question: string;
  options: string[];
  correct: number; // index 1–4
  marks: number;
  difficulty: "Easy" | "Medium" | "Hard";
}
