'use client';
import { QuestionsApi } from '@/app/api';
import { useState, useEffect, JSX } from 'react';
import { Question as TQuestion, UiState } from '@/app/types';
import { Question } from '../Categories/Question/Question';

export function Category({ slug }: { slug: string }): JSX.Element {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  useEffect(() => {
    async function fetchData() {
      setUiState('loading');
      const api = new QuestionsApi();
      const response = await api.getQuestions(slug);
      if (!response) {
        setUiState('error');
        return;
      }
      if (response.data.length === 0) {
        setUiState('empty');
      } else {
        setUiState('data');
        setQuestions(response.data);
      }
    }
    fetchData();
  }, [slug]);

  switch (uiState) {
    case 'loading':
      return <p>Sæki flokk...</p>;
    case 'error':
      return <p>Villa við að sækja flokk...</p>;
    case 'empty':
      return <p>Engar gögn fundust</p>;
    case 'data':
      return (
        <div>
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </div>
      );
    case 'initial':
    default:
      return <p>Þú hefur ekki valið flokk</p>;
  }
}
