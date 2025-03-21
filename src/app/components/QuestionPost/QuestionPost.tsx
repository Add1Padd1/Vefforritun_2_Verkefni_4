'use client';

import React, { JSX, useState } from 'react';
import Styles from './QuestionPost.module.css';

export function QuestionPost({
  categorySlug,
}: {
  categorySlug: string;
}): JSX.Element {
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState([{ text: '', correct: false }]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: '', correct: false }]);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].text = value;
    setAnswers(updatedAnswers);
  };

  const handleCorrectChange = (index: number) => {
    const updatedAnswers = answers.map((answer, i) => ({
      ...answer,
      correct: i === index,
    }));
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/flokkar/${categorySlug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          answers,
          category: categorySlug,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to save the question. Please try again.');
      }

      setSubmitted(true);
      console.log('Question successfully submitted:', {
        title,
        answers,
        categorySlug,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.container}>
      <h1 className={Styles.makeQuestion}>Create a Question</h1>
      <form onSubmit={handleSubmit} className={Styles.form}>
        <div className={Styles.field}>
          <label htmlFor="title">Question Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={Styles.answers}>
          <h2>Answers:</h2>
          {answers.map((answer, index) => (
            <div key={index} className={Styles.answer}>
              <input
                type="text"
                value={answer.text}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder={`Answer ${index + 1}`}
                required
              />
              <input
                type="radio"
                name="correctAnswer"
                checked={answer.correct}
                onChange={() => handleCorrectChange(index)}
              />
              <label>Correct</label>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAnswer}
            className={Styles.addButton}
          >
            Add Answer
          </button>
        </div>
        <button
          type="submit"
          className={Styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Question'}
        </button>
      </form>
      {error && <p className={Styles.error}>{error}</p>}
      {submitted && (
        <div className={Styles.submittedContainer}>
          <h2 className={Styles.submittedTitle}>Question Submitted!</h2>
          <div className={Styles.submittedQuestion}>
            <p className={Styles.submittedQuestionTitle}>Title: {title}</p>
            <ul className={Styles.submittedAnswers}>
              {answers.map((answer, index) => (
                <li
                  key={index}
                  className={`${Styles.submittedAnswer} ${
                    answer.correct
                      ? Styles.correctAnswer
                      : Styles.incorrectAnswer
                  }`}
                >
                  {answer.text} {answer.correct && '(Correct)'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
