import { Book } from '@/core/types';
import { api } from '../api';

type CreateBookParams = Partial<{
  title: string;
  publisher: string;
  year: number;
  author: string;
  description: string;
  image: string;
}>;

type CreateBookResponse = Book;

export async function createBook(params: CreateBookParams): Promise<CreateBookResponse> {
  const response = await api.post('/books', params);
  return response.data;
}
