"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import styles from "./Dialog.module.css";

interface DialogProps {
  open: boolean;
  title: string;
  tone?: "default" | "warning" | "danger";
  children?: ReactNode;
  actions: ReactNode;
  /** Escape bosilganda */
  onCancel: () => void;
}

/** Native <dialog>: fokusni ichida ushlab turadi va Escape'ni qo‘llab-quvvatlaydi */
export function Dialog({ open, title, tone = "default", children, actions, onCancel }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`${styles.dialog} ${styles[tone]}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
    >
      {tone !== "default" && (
        <div className={styles.icon} aria-hidden>
          !
        </div>
      )}
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {children && <div className={styles.body}>{children}</div>}
      <div className={styles.actions}>{actions}</div>
    </dialog>
  );
}
