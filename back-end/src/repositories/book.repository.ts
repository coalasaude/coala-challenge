import { Injectable } from '@nestjs/common';

import { Book } from '@/domain/entities';

import { BookRepository } from './book-repository.interface';

@Injectable()
export class PostgresBookRepository implements BookRepository {
  async create(book: Book): Promise<Book> {
    console.info('Book created successfully');

    return book;
  }
}
