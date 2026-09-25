"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTestSnapshot } from "@/hooks/useTestSnapshot";
import { resetTest } from "@/lib/testStore";
import { LoadingScreen } from "./LoadingScreen";
import { Logo } from "./Logo";
import { QuestionResultGrid } from "./QuestionResultGrid";
import { ResetButton } from "./ResetButton";
import { ResultCard } from "./ResultCard";
import styles from "./ResultScreen.module.css";

export function ResultScreen() {
  const router = useRouter();
  const snapshot = useTestSnapshot();
  const result = snapshot?.result;

  let redirectTo: string | null = null;
  if (snapshot && !result) redirectTo = snapshot.session?.status === "in-progress" ? "/test" : "/";

  useEffect(() => {
    if (redirectTo) router.replace(redirectTo);
  }, [redirectTo, router]);

  if (!result || redirectTo) return <LoadingScreen />;

  return (
    <main className={styles.page}>
      <div className={styles.brand}>
        <Logo size={36} />
        <span>CHTT Test</span>
      </div>

      <section className={styles.card} aria-label="Test natijasi">
        <ResultCard result={result} />

        <div className={styles.details}>
          <h2 className={styles.subheading}>Savollar natijasi</h2>
          <QuestionResultGrid results={result.questionResults} />
        </div>

        {/* Reset keyin snapshot bo‘shaydi va yuqoridagi effect start sahifasiga qaytaradi */}
        <div className={styles.footer}>
          <ResetButton onConfirm={resetTest} />
        </div>
      </section>
    </main>
  );
}
