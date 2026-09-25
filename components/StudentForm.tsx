"use client";

import { useId, useState, type FormEvent } from "react";
import styles from "./StudentForm.module.css";

interface StudentFormProps {
  onStart: (studentName: string) => void;
}

export function StudentForm({ onStart }: StudentFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const inputId = useId();
  const errorId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 3) {
      setError("Iltimos, ism va familiyangizni kiriting.");
      return;
    }
    onStart(trimmed);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor={inputId} className={styles.label}>
        Ism-familiyangizni kiriting
      </label>
      <input
        id={inputId}
        className={styles.input}
        type="text"
        name="studentName"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          if (error) setError("");
        }}
        placeholder="Masalan: Sherzod Yarmatxonov"
        autoComplete="off"
        autoFocus
        maxLength={80}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      <p id={errorId} className={styles.error} role="alert">
        {error}
      </p>
      <button type="submit" className={`btn btn-primary ${styles.submit}`}>
        Testni boshlash
      </button>
    </form>
  );
}
