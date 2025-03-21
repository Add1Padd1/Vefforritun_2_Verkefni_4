'use client';
import Link from 'next/link';
import Styles from './Categories.module.css';
import { useEffect, useState } from 'react';
import { Category, Paginated, UiState } from '@/app/types';
import { QuestionsApi } from '@/app/api';
type Props = {
  title: string;
  tag?: string;
  popular?: boolean;
};

export default function Categories({ title }: Props) {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [categories, setCategories] = useState<Paginated<Category> | null>(
    null
  );
  useEffect(() => {
    async function fetchData() {
      setUiState('loading');

      const api = new QuestionsApi();
      const categoriesResponse = await api.getCategories();

      if (!categoriesResponse) {
        setUiState('error');
      } else {
        setUiState('data');
        setCategories(categoriesResponse);
      }
    }
    fetchData();
  }, []);
  console.log(categories);

  return (
    <div className={Styles.cats}>
      <h2>{title} </h2>
      {uiState === 'loading' && (
        <p className={Styles.loading}>Sæki flokka...</p>
      )}
      {uiState === 'error' && (
        <p className={Styles.error}>Villa við að sækja flokka...</p>
      )}
      {uiState === 'data' && (
        <ul>
          {categories?.data.map((category, index) => (
            <li key={index}>
              <Link href={`/flokkar/${category.slug}`}> {category.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
