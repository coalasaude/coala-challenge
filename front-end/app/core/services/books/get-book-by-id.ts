import { Book } from '@/core/types';
import { api } from '../api';

export async function getBook(bookId: string): Promise<Book> {
  const response = await api.get(`/books/${bookId}`);
  return response.data;
}
