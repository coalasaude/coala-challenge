import { api } from '../api';

type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: string;
  description: string;
  image?: string;
};

export async function getBook(bookId: string): Promise<Book> {
  const response = await api.get(`/books/${bookId}`);
  return response.data;
}
