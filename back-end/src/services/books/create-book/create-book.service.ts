import { Inject, Injectable } from '@nestjs/common';

import { Book } from '@/domain/entities';
import { BookRepository } from '@/repositories';

import { CreateBook } from './create-book.interface';

@Injectable()
export class CreateBookService implements CreateBook {
  constructor(@Inject('BookRepository') private readonly bookRepository: BookRepository) {}

  async create(params: CreateBook.Params): Promise<CreateBook.Response> {
    let book = new Book(params);
    book = await this.bookRepository.create(book);
    return book;
  }
}
