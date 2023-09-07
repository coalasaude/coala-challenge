import { Inject, Injectable } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { Book } from '@/books/domain/entities';
import { BookRepository } from '@/books/repositories';

import { CreateBookService } from './create-book.interface';

@Injectable()
export class CreateBookServiceImpl implements CreateBookService {
  constructor(@Inject(Tokens.BookRepository) private readonly bookRepository: BookRepository) {}

  async create(params: CreateBookService.Params): Promise<CreateBookService.Response> {
    let book = new Book(params);
    book = await this.bookRepository.create(book);
    return book;
  }
}
