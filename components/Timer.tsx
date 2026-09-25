import styles from "./Timer.module.css";

interface TimerProps {
  remainingMs: number;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function Timer({ remainingMs }: TimerProps) {
  const totalSeconds = Math.ceil(remainingMs / 1000);
  const tone = totalSeconds <= 60 ? styles.danger : totalSeconds <= 5 * 60 ? styles.warning : "";

  return (
    <div className={`${styles.timer} ${tone}`} role="timer" aria-label={`Qolgan vaqt ${formatTime(totalSeconds)}`}>
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 9v4l2.5 2.5M9.5 2.5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className={styles.label}>Qolgan vaqt</span>
      <span className={styles.value}>{formatTime(totalSeconds)}</span>
    </div>
  );
}
