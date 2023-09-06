import { Book } from '@/domain/entities';

export interface BookRepository {
  create(book: Book): Promise<Book>;
  getById(id: string): Promise<Book | undefined>;
}
