export type TestStatus = "in-progress" | "completed";

export type FinishReason = "submitted" | "timeout" | "tab-switch";

/** Testdagi bitta savol: original savol id'si va variantlarning shu o‘quvchi uchun random tartibi */
export interface SessionQuestion {
  questionId: number;
  optionIds: string[];
}

export interface TestSession {
  studentName: string;
  status: TestStatus;
  startedAt: number;
  currentQuestionIndex: number;
  /** Savollar shu o‘quvchi uchun random tartibda */
  questions: SessionQuestion[];
  /** questionId → optionId */
  answers: Record<string, string>;
  tabSwitchCount: number;
  warningAcknowledged: boolean;
}

export interface TestResult {
  studentName: string;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  /** Testdagi tartib raqami (1..25) → to‘g‘ri/noto‘g‘ri */
  questionResults: Record<string, boolean>;
  finishReason: FinishReason;
  finishedAt: number;
}
