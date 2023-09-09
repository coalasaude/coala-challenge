import { api } from '../api';

type CreateBookParams = Partial<{
  title: string;
  publisher: string;
  year: number;
  author: string;
  description: string;
  image: string;
}>;

type CreateBookResponse = {
  id: string;
  title: string;
  publisher: string;
  year: number;
  image?: string;
};

export async function createBook(params: CreateBookParams): Promise<CreateBookResponse> {
  const response = await api.post('/books', params);
  return response.data;
}
