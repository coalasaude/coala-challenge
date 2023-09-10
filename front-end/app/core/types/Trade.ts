import { Book } from './Book';

export type Trade = {
  id: string;
  status: string;
  message: string;
  book: Book;
};
