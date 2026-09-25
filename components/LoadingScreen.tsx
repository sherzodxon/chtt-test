import styles from "./LoadingScreen.module.css";

export function LoadingScreen() {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden />
      <span className="visually-hidden">Yuklanmoqda…</span>
    </div>
  );
}
