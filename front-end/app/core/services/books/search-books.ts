import { Book } from '@/core/types';
import { api } from '../api';
import { Pagination } from '@/core/types';

type SearchBookResponse = {
  pagination: Pagination;
  books: Book[];
};

export async function searchBooks(q: string): Promise<Book[]> {
  const response = await api.get<SearchBookResponse>(`/books?q=${q}`);
  return response.data.books;
}
