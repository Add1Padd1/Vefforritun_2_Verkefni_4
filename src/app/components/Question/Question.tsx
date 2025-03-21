import { Question as QuestionType } from '@/app/types';
import React from 'react';
import { JSX } from 'react';
import Styles from './Question.module.css';

export function Question({
  question,
}: {
  question: QuestionType;
}): JSX.Element {
  const [answerId, setAnswerId] = React.useState<number | null>(null);
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Submit, valið svar er:', answerId);
  };
  return (
    <div className={Styles.container}>
      <h2 className={Styles.question}>{question.text}</h2>
      <form onSubmit={onSubmit}>
        <ul className={Styles.answerTexts}>
          {question.answers.map((answer) => {
            /* const isCorrect = answer.id === answerId && answer.correct; */
            return (
              <li key={answer.id} className={Styles.answerText}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={answer.id}
                    onChange={() => setAnswerId(answer.id)}
                    disabled={submitted}
                  />
                  {answer.text}
                  {submitted && (
                    <span
                      style={{
                        color: answer.correct ? 'green' : 'red',
                        fontWeight: 'bold',
                      }}
                    >
                      {answer.correct ? ' - RÉTT' : ' - RANGT'}
                    </span>
                  )}
                </label>
              </li>
            );
          })}
        </ul>
        <button
          type="submit"
          disabled={submitted || answerId === null}
          className={Styles.questionButton}
        >
          Svara
        </button>
      </form>
    </div>
  );
}
