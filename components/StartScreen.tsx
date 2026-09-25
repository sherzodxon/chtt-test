"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTestSnapshot } from "@/hooks/useTestSnapshot";
import { startTest } from "@/lib/testStore";
import { PASSING_PERCENTAGE, TEST_DURATION_MS } from "@/lib/config";
import { questions } from "@/data/questions";
import { LoadingScreen } from "./LoadingScreen";
import { Logo } from "./Logo";
import { StudentForm } from "./StudentForm";
import styles from "./StartScreen.module.css";

const rules = [
  { value: String(questions.length), label: "ta savol" },
  { value: String(TEST_DURATION_MS / 60000), label: "daqiqa" },
  { value: `${PASSING_PERCENTAGE}%`, label: "o‘tish bali" },
];

export function StartScreen() {
  const router = useRouter();
  const snapshot = useTestSnapshot();
  const redirectTo =
    snapshot?.session?.status === "in-progress"
      ? "/test"
      : snapshot?.result
        ? "/result"
        : null;

  useEffect(() => {
    if (redirectTo) router.replace(redirectTo);
  }, [redirectTo, router]);

  if (!snapshot || redirectTo) return <LoadingScreen />;

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="start-title">
        <div className={styles.brand}>
          <div className={styles.logoWrap}>
            <Logo size={96} priority />
          </div>
          <h1 id="start-title" className={styles.title}>
            CHTT Test
          </h1>
          <p className={styles.subtitle}>Bilimingizni sinab ko‘ring</p>

          <dl className={styles.stats}>
            {rules.map((rule) => (
              <div key={rule.label} className={styles.stat}>
                <dt className="visually-hidden">{rule.label}</dt>
                <dd>
                  <strong>{rule.value}</strong>
                  <span>{rule.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.formSide}>
          {/* Sessiya yaratilgach, yuqoridagi effect /test sahifasiga o‘tkazadi */}
          <StudentForm onStart={startTest} />

          <ul className={styles.notes}>
            <li>Har bir savolda faqat bitta to‘g‘ri javob bor.</li>
            <li>Javob tanlamasdan keyingi savolga o‘tib bo‘lmaydi.</li>
            <li>Vaqt tugaganda test avtomatik yakunlanadi.</li>
            <li>
              Test sahifasidan <b>3 marta</b> chiqilsa, test avtomatik yakunlanadi.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
