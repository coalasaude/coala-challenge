import { Book } from '@/books/domain/entities';

export interface BookRepository {
  create(book: Book): Promise<Book>;
  getById(id: string): Promise<Book | undefined>;
}
