import QuizPage from "@/components/QuizPage";
import { Suspense } from "react";

export default function QuizPageWrapper() {
  return (
    <Suspense fallback={<div>Loading quiz...</div>}>
      <QuizPage />
    </Suspense>
  );
}
