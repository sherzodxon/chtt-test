"use client";

import { useCallback, useEffect, useMemo, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { questionsById, type Option } from "@/data/questions";
import { useCountdown } from "@/hooks/useCountdown";
import { useTabMonitor } from "@/hooks/useTabMonitor";
import { useTestSnapshot } from "@/hooks/useTestSnapshot";
import { TAB_SWITCH_WARNING_AT, TEST_DURATION_MS } from "@/lib/config";
import {
  acknowledgeWarning,
  finishTest,
  goToQuestion,
  recordTabLeave,
  selectAnswer,
} from "@/lib/testStore";
import type { TestSession } from "@/lib/types";
import { Dialog } from "./Dialog";
import { LoadingScreen } from "./LoadingScreen";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { TestHeader } from "./TestHeader";
import styles from "./TestScreen.module.css";

export function TestScreen() {
  const router = useRouter();
  const snapshot = useTestSnapshot();
  const session = snapshot?.session;

  let redirectTo: string | null = null;
  if (snapshot && !session) redirectTo = "/";
  else if (session?.status === "completed") redirectTo = snapshot?.result ? "/result" : "/";

  useEffect(() => {
    if (redirectTo) router.replace(redirectTo);
  }, [redirectTo, router]);

  if (!session || redirectTo) return <LoadingScreen />;
  return <ActiveTest session={session} />;
}

function ActiveTest({ session }: { session: TestSession }) {
  const deadline = session.startedAt + TEST_DURATION_MS;
  const handleExpire = useCallback(() => finishTest("timeout", deadline), [deadline]);
  const remainingMs = useCountdown(deadline, handleExpire);
  useTabMonitor(true, recordTabLeave);

  const total = session.questions.length;
  const index = Math.min(session.currentQuestionIndex, total - 1);
  const entry = session.questions[index];
  const question = questionsById.get(entry.questionId)!;
  const selectedId = session.answers[entry.questionId];
  const isLast = index === total - 1;
  const answeredCount = Object.keys(session.answers).length;

  const options = useMemo(
    () =>
      entry.optionIds
        .map((id) => question.options.find((o) => o.id === id))
        .filter((o): o is Option => !!o),
    [entry, question],
  );

  const formRef = useRef<HTMLFormElement>(null);

  const handleSelect = useCallback(
    (optionId: string) => selectAnswer(entry.questionId, optionId),
    [entry.questionId],
  );

  // Klaviatura: 1–3 yoki A–C javobni tanlaydi, Enter keyingi savolga o‘tkazadi
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || document.querySelector("dialog[open]")) return;
      const form = formRef.current;
      if (event.key === "Enter") {
        // Forma ichidagi elementlarda Enter'ni brauzerning o‘zi yuboradi
        if (form && !form.contains(event.target as Node)) {
          event.preventDefault();
          form.requestSubmit();
        }
        return;
      }
      const key = event.key.toLowerCase();
      const byDigit = Number.parseInt(key, 10) - 1;
      const byLetter = key.length === 1 ? key.charCodeAt(0) - 97 : -1;
      const optionIndex = byDigit >= 0 ? byDigit : byLetter;
      const option = options[optionIndex];
      if (option) {
        event.preventDefault();
        handleSelect(option.id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [options, handleSelect]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedId) return;
    if (isLast) {
      finishTest("submitted");
    } else {
      goToQuestion(index + 1);
      window.scrollTo({ top: 0 });
    }
  };

  const handlePrevious = () => {
    goToQuestion(index - 1);
    window.scrollTo({ top: 0 });
  };

  const showWarning = session.tabSwitchCount >= TAB_SWITCH_WARNING_AT && !session.warningAcknowledged;

  return (
    <>
      <TestHeader
        studentName={session.studentName}
        remainingMs={remainingMs}
        tabSwitchCount={session.tabSwitchCount}
      />

      <main className={styles.main}>
        <ProgressBar current={index + 1} total={total} answered={answeredCount} />

        <form ref={formRef} className={styles.card} onSubmit={handleSubmit} aria-label={`Savol ${index + 1} / ${total}`}>
          <QuestionCard
            key={entry.questionId}
            number={index + 1}
            question={question}
            options={options}
            selectedId={selectedId}
            onSelect={handleSelect}
          />

          <div className={styles.nav}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={index === 0}
            >
              <span aria-hidden>←</span> Oldingi
            </button>
            <p className={styles.hint} aria-live="polite">
              {selectedId ? "" : "Davom etish uchun javobni tanlang"}
            </p>
            <button type="submit" className={`btn btn-primary ${styles.next}`} disabled={!selectedId}>
              {isLast ? "Natijani ko‘rish" : "Keyingi savol"} {!isLast && <span aria-hidden>→</span>}
            </button>
          </div>
        </form>

        <p className={styles.keys} aria-hidden>
          Klaviatura: <kbd>1</kbd>–<kbd>{options.length}</kbd> javobni tanlash, <kbd>Enter</kbd> davom etish
        </p>
      </main>

      <Dialog
        open={showWarning}
        tone="warning"
        title="Diqqat!"
        onCancel={acknowledgeWarning}
        actions={
          <button type="button" className="btn btn-primary" onClick={acknowledgeWarning} autoFocus>
            Tushundim, davom etish
          </button>
        }
      >
        <p>Siz test sahifasini tark etdingiz.</p>
        <p>
          <strong>Yana bir marta</strong> test sahifasidan chiqishingiz testning avtomatik yakunlanishiga
          olib keladi.
        </p>
      </Dialog>
    </>
  );
}
