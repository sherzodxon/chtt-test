import type { FinishReason, TestResult } from "@/lib/types";
import styles from "./ResultCard.module.css";

const FINISH_REASON_TEXT: Record<FinishReason, string | null> = {
  submitted: null,
  timeout: "Test vaqt tugagani sababli avtomatik yakunlandi.",
  "tab-switch": "Test test sahifasidan chiqish sababli yakunlandi.",
};

const RING_RADIUS = 54;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

export function ResultCard({ result }: { result: TestResult }) {
  const reason = FINISH_REASON_TEXT[result.finishReason];

  return (
    <div className={`${styles.summary} ${result.passed ? styles.passed : styles.failed}`}>
      <div className={styles.status}>
        {result.passed ? (
          <>
            <h1 className={styles.heading}>Tabriklaymiz!</h1>
            <p className={styles.message}>Siz testdan o‘tdingiz.</p>
          </>
        ) : (
          <h1 className={styles.heading}>Siz imtihondan o‘ta olmadingiz.</h1>
        )}
      </div>

      <p className={styles.student}>{result.studentName}</p>

      <div className={styles.score}>
        <svg className={styles.ring} viewBox="0 0 128 128" aria-hidden>
          <circle className={styles.ringTrack} cx="64" cy="64" r={RING_RADIUS} />
          <circle
            className={styles.ringValue}
            cx="64"
            cy="64"
            r={RING_RADIUS}
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={RING_LENGTH * (1 - result.percentage / 100)}
          />
        </svg>
        <div className={styles.scoreText}>
          <span className={styles.percentage}>{result.percentage}%</span>
          <span className={styles.fraction}>
            {result.correctAnswers} / {result.totalQuestions}
          </span>
        </div>
      </div>
      <p className="visually-hidden">
        Natija: {result.percentage} foiz, {result.totalQuestions} ta savoldan {result.correctAnswers} tasi to‘g‘ri.
      </p>

      {reason && (
        <p className={styles.reason} role="note">
          {reason}
        </p>
      )}
    </div>
  );
}
