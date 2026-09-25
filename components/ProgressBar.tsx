import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  current: number;
  total: number;
  answered: number;
}

export function ProgressBar({ current, total, answered }: ProgressBarProps) {
  return (
    <div className={styles.progress}>
      <div className={styles.meta}>
        <span className={styles.counter}>
          Savol <strong>{current}</strong> / {total}
        </span>
        <span className={styles.answered}>
          Javob berilgan: {answered} / {total}
        </span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-label="Test jarayoni"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-valuetext={`Savol ${current} / ${total}`}
      >
        <div className={styles.fill} style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  );
}
