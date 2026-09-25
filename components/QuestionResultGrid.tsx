import styles from "./QuestionResultGrid.module.css";

interface QuestionResultGridProps {
  /** Testdagi tartib raqami → to‘g‘ri/noto‘g‘ri. Savol matni va javoblar ataylab bu yerga berilmaydi. */
  results: Record<string, boolean>;
}

export function QuestionResultGrid({ results }: QuestionResultGridProps) {
  const entries = Object.entries(results).sort(([a], [b]) => Number(a) - Number(b));

  return (
    <ol className={styles.grid} aria-label="Savollar natijasi">
      {entries.map(([number, correct]) => (
        <li
          key={number}
          className={`${styles.cell} ${correct ? styles.correct : styles.wrong}`}
          aria-label={`${number}-savol: ${correct ? "to‘g‘ri" : "noto‘g‘ri"}`}
        >
          <span className={styles.number}>{number}</span>
          <span className={styles.mark} aria-hidden>
            {correct ? "✓" : "✕"}
          </span>
        </li>
      ))}
    </ol>
  );
}
