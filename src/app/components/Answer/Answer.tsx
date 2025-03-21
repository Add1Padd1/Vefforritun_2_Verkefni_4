import { JSX } from 'react';
import Styles from './Answer.module.css';

type Props = {
  text: string;
  name: string;
  id: string;
  state?: 'initial' | 'correct' | 'incorrect';
  checked?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Answer({
  text,
  name,
  id,
  state,
  checked,
  disabled,
  onChange,
}: Props): JSX.Element {
  const className =
    state === 'correct'
      ? Styles.correct
      : state === 'incorrect'
      ? Styles.incorrect
      : '';
  return (
    <div className={[Styles.answer, className].join(' ')}>
      <input
        type="radio"
        name={name}
        id={id}
        onChange={() => onChange}
        checked={checked}
        disabled={disabled}
      />
      <label htmlFor={id}>{text}</label>
    </div>
  );
}
