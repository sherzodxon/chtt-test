/**
 * Test holati localStorage'da saqlanadi; komponentlar unga `useSyncExternalStore` orqali ulanadi.
 * Shu sabab refresh, brauzerni qayta ochish va boshqa tab'dagi o‘zgarishlar bir xil yo‘l bilan tiklanadi.
 */
import { questions } from "@/data/questions";
import { STORAGE_KEYS, TAB_SWITCH_FINISH_AT } from "./config";
import { calculateResult } from "./scoring";
import { shuffle } from "./shuffle";
import type { FinishReason, TestResult, TestSession } from "./types";

export interface TestSnapshot {
  session: TestSession | null;
  result: TestResult | null;
}

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedSnapshot: TestSnapshot = { session: null, result: null };

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function parse<T>(raw: string | null, isValid: (value: unknown) => value is T): T | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    return isValid(value) ? value : null;
  } catch {
    return null;
  }
}

function isSession(value: unknown): value is TestSession {
  const v = value as TestSession | null;
  return (
    !!v &&
    typeof v.studentName === "string" &&
    (v.status === "in-progress" || v.status === "completed") &&
    typeof v.startedAt === "number" &&
    Array.isArray(v.questions) &&
    v.questions.length > 0 &&
    typeof v.answers === "object" &&
    v.answers !== null
  );
}

function isResult(value: unknown): value is TestResult {
  const v = value as TestResult | null;
  return !!v && typeof v.percentage === "number" && typeof v.questionResults === "object";
}

function emit() {
  listeners.forEach((listener) => listener());
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Saqlash imkoni bo‘lmasa (masalan, private rejim) — ilova joriy sahifada ishlashda davom etadi
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || Object.values(STORAGE_KEYS).includes(event.key as never)) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot(): TestSnapshot {
  const sessionRaw = readRaw(STORAGE_KEYS.session);
  const resultRaw = readRaw(STORAGE_KEYS.result);
  const raw = `${sessionRaw}\u0000${resultRaw}`;
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = {
      session: parse(sessionRaw, isSession),
      result: parse(resultRaw, isResult),
    };
  }
  return cachedSnapshot;
}

/** Server va hydration paytida holat hali noma'lum */
export function getServerSnapshot(): null {
  return null;
}

function updateSession(update: (session: TestSession) => TestSession | null) {
  const { session } = getSnapshot();
  if (!session || session.status !== "in-progress") return;
  const next = update(session);
  if (next) {
    write(STORAGE_KEYS.session, next);
    emit();
  }
}

export function startTest(studentName: string) {
  const session: TestSession = {
    studentName: studentName.trim().replace(/\s+/g, " "),
    status: "in-progress",
    startedAt: Date.now(),
    currentQuestionIndex: 0,
    questions: shuffle(questions).map((q) => ({
      questionId: q.id,
      optionIds: shuffle(q.options.map((o) => o.id)),
    })),
    answers: {},
    tabSwitchCount: 0,
    warningAcknowledged: false,
  };
  try {
    window.localStorage.removeItem(STORAGE_KEYS.result);
  } catch {}
  write(STORAGE_KEYS.session, session);
  emit();
}

export function selectAnswer(questionId: number, optionId: string) {
  updateSession((s) => ({ ...s, answers: { ...s.answers, [questionId]: optionId } }));
}

export function goToQuestion(index: number) {
  updateSession((s) => {
    if (index < 0 || index >= s.questions.length) return null;
    // Oldinga faqat javob berilgan savoldan o‘tish mumkin
    if (index > s.currentQuestionIndex) {
      const current = s.questions[s.currentQuestionIndex];
      if (!s.answers[current.questionId]) return null;
    }
    return { ...s, currentQuestionIndex: index };
  });
}

export function finishTest(reason: FinishReason, finishedAt = Date.now()) {
  const { session } = getSnapshot();
  if (!session || session.status !== "in-progress") return;
  const completed: TestSession = { ...session, status: "completed" };
  write(STORAGE_KEYS.result, calculateResult(completed, reason, finishedAt));
  write(STORAGE_KEYS.session, completed);
  emit();
}

/** Test sahifasidan chiqishni qayd etadi; limitga yetganda testni yakunlaydi */
export function recordTabLeave() {
  const { session } = getSnapshot();
  if (!session || session.status !== "in-progress") return;
  const tabSwitchCount = session.tabSwitchCount + 1;
  write(STORAGE_KEYS.session, { ...session, tabSwitchCount });
  if (tabSwitchCount >= TAB_SWITCH_FINISH_AT) {
    finishTest("tab-switch");
    return;
  }
  emit();
}

export function acknowledgeWarning() {
  updateSession((s) => ({ ...s, warningAcknowledged: true }));
}

export function resetTest() {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
  } catch {}
  emit();
}
