'use client';
import { QuestionsApi } from '@/app/api';
import { useState, useEffect } from 'react';
import { Category as CategoryType } from '@/app/types';

export function Category({ slug }: { slug: string }) {
  const [category, setCategory] = useState<CategoryType | null>(null);
  useEffect(() => {
    async function fetchData() {
      const api = new QuestionsApi();
      const response = await api.getCategory(slug);
      setCategory(response);
    }
    fetchData();
  }, [slug]);
  if (!category) {
    return <p>Flokkur fannst ekki</p>;
  }

  return <p>{JSON.stringify(category)}</p>;
}
