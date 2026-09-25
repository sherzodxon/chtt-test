import { TAB_SWITCH_FINISH_AT } from "@/lib/config";
import { Logo } from "./Logo";
import { Timer } from "./Timer";
import styles from "./TestHeader.module.css";

interface TestHeaderProps {
  studentName: string;
  remainingMs: number;
  tabSwitchCount: number;
}

export function TestHeader({ studentName, remainingMs, tabSwitchCount }: TestHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo size={40} />
          <div className={styles.brandText}>
            <span className={styles.name}>CHTT Test</span>
            <span className={styles.student}>{studentName}</span>
          </div>
        </div>
        <div className={styles.right}>
          {tabSwitchCount > 0 && (
            <span className={styles.leaves} title="Test sahifasidan chiqishlar soni">
              Chiqish: {tabSwitchCount} / {TAB_SWITCH_FINISH_AT}
            </span>
          )}
          <Timer remainingMs={remainingMs} />
        </div>
      </div>
    </header>
  );
}
