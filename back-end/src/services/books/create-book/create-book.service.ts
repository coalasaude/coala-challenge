import { Inject, Injectable } from '@nestjs/common';

import { Book } from '@/domain/entities';
import { BookRepository } from '@/repositories';

import { CreateBookService } from './create-book.interface';
import { Tokens } from '@/settings/tokens';

@Injectable()
export class CreateBookServiceImpl implements CreateBookService {
  constructor(@Inject(Tokens.BookRepository) private readonly bookRepository: BookRepository) {}

  async create(params: CreateBookService.Params): Promise<CreateBookService.Response> {
    let book = new Book(params);
    book = await this.bookRepository.create(book);
    return book;
  }
}
