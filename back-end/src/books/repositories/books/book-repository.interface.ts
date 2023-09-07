import { Book } from '@/books/domain/entities';

export interface BookRepository {
  create(book: Book): Promise<Book>;
  getById(params: GetByIdParams): Promise<Book | undefined>;
}

export type GetByIdParams = {
  userId?: string;
  id: string;
};
