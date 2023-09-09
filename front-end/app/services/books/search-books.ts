import { api } from '../api';

type Pagination = {
  page: number;
  limit: number;
  total: number;
};

type Book = {
  id: string;
  title: string;
  image?: string;
};

type SearchBookResponse = {
  pagination: Pagination;
  books: Book[];
};

export async function searchBooks(q: string): Promise<Book[]> {
  const response = await api.get<SearchBookResponse>(`/books?q=${q}`);
  return response.data.books;
}
