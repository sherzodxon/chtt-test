import styles from "./AnswerOption.module.css";

interface AnswerOptionProps {
  letter: string;
  text: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
}

export function AnswerOption({ letter, text, value, checked, onSelect }: AnswerOptionProps) {
  return (
    <label className={styles.option} data-checked={checked || undefined}>
      <input
        type="radio"
        name="answer"
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        className={styles.input}
      />
      <span className={styles.letter} aria-hidden>
        {letter}
      </span>
      <span className={styles.text}>{text}</span>
      <span className={styles.check} aria-hidden />
    </label>
  );
}
