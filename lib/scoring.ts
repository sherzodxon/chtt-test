import { questionsById } from "@/data/questions";
import { PASSING_PERCENTAGE } from "./config";
import type { FinishReason, TestResult, TestSession } from "./types";

export function calculatePercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/** Yaxlitlanmagan foiz bilan tekshiriladi, shunda 59.6% "60%" bo‘lib o‘tib ketmaydi */
export function isPassed(correct: number, total: number): boolean {
  return total > 0 && (correct / total) * 100 >= PASSING_PERCENTAGE;
}

export function calculateResult(
  session: TestSession,
  finishReason: FinishReason,
  finishedAt: number,
): TestResult {
  const questionResults: Record<string, boolean> = {};
  let correctAnswers = 0;

  session.questions.forEach(({ questionId }, index) => {
    const selected = session.answers[questionId];
    const option = questionsById.get(questionId)?.options.find((o) => o.id === selected);
    const isCorrect = option?.correct === true;
    if (isCorrect) correctAnswers++;
    questionResults[index + 1] = isCorrect;
  });

  const totalQuestions = session.questions.length;
  return {
    studentName: session.studentName,
    correctAnswers,
    totalQuestions,
    percentage: calculatePercentage(correctAnswers, totalQuestions),
    passed: isPassed(correctAnswers, totalQuestions),
    questionResults,
    finishReason,
    finishedAt,
  };
}
