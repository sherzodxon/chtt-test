import type { Option, Question } from "@/data/questions";
import { AnswerOption } from "./AnswerOption";
import { QuestionImage } from "./QuestionImage";
import styles from "./QuestionCard.module.css";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

interface QuestionCardProps {
  number: number;
  question: Question;
  /** Shu o‘quvchi uchun random tartiblangan variantlar */
  options: Option[];
  selectedId: string | undefined;
  onSelect: (optionId: string) => void;
}

export function QuestionCard({ number, question, options, selectedId, onSelect }: QuestionCardProps) {
  return (
    <fieldset className={styles.card}>
      <legend className={styles.legend}>
        <span className={styles.number}>{number})</span>
        <span className={styles.text}>{question.question}</span>
      </legend>

      {question.image && <QuestionImage image={question.image} />}

      <div className={styles.options}>
        {options.map((option, index) => (
          <AnswerOption
            key={option.id}
            letter={LETTERS[index]}
            text={option.text}
            value={option.id}
            checked={selectedId === option.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </fieldset>
  );
}
