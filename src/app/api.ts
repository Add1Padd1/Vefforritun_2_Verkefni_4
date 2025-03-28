import { Category, Paginated, Question } from './types';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8000';

export class QuestionsApi {
  async fetchFromApi<T>(url: string): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url);
    } catch (e) {
      console.error('Error fetching from api', url, e);
      return null;
    }
    if (!response.ok) {
      console.error('non 200 status from API', url);
      return null;
    }
    if (response.status === 404) {
      console.error('404 from API', url);
      return null;
    }
    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error('Error parsing JSON', url, e);
      return null;
    }
    return json as T;
  }
  async getCategory(slug: string): Promise<Category | null> {
    const url = BASE_URL + `/categories/${slug}`;
    const response = await this.fetchFromApi<Category | null>(url);
    return response;
  }

  async getCategories(): Promise<Paginated<Category> | null> {
    console.log('BASE_URL er......', BASE_URL);
    const url = BASE_URL + '/categories';
    const response = await this.fetchFromApi<Paginated<Category>>(url);

    //TODO hér gæti ég staðfest gerð gagna
    return response;
  }

  async getQuestions(
    categorySlug: string
  ): Promise<Paginated<Question> | null> {
    const url = BASE_URL + `/questions?category=${categorySlug}`;
    const response = await this.fetchFromApi<Paginated<Question>>(url);
    return response;
  }
}
