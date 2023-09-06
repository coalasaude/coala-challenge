import { Book } from '../domain/entities/book.entity';

export interface BookRepository {
  create(book: Book): Promise<Book>;
}
