import { Question as QuestionType } from '@/app/types';
import React from 'react';
import { JSX } from 'react';

export function Question({
  question,
}: {
  question: QuestionType;
}): JSX.Element {
  const [answerId, setAnswerId] = React.useState<number | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit, valið svar er:', answerId);
  };
  return (
    <div>
      <h2>{question.text}</h2>
      <form onSubmit={onSubmit}>
        <ul>
          {question.answers.map((answer) => {
            const isCorrect = answer.id === answerId && answer.correct;
            return (
              <li key={answer.id}>
                <input
                  type="radio"
                  name="answer"
                  value={answer.id}
                  onChange={() => setAnswerId(answer.id)}
                />
                {answer.text}-{isCorrect ? 'rétt' : 'rangt'}
              </li>
            );
          })}
        </ul>
        <button type="submit">Svara</button>
      </form>
    </div>
  );
}
