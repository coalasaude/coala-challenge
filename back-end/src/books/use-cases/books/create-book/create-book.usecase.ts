import { Inject, Injectable } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { Book } from '@/books/domain/entities';
import { BookRepository } from '@/books/infrastructure/repositories';

import { CreateBookUseCase } from './create-book.interface';

@Injectable()
export class CreateBookUseCaseImpl implements CreateBookUseCase {
  constructor(@Inject(Tokens.BookRepository) private readonly bookRepository: BookRepository) {}

  async create(params: CreateBookUseCase.Params): Promise<CreateBookUseCase.Response> {
    let book = new Book(params);
    book = await this.bookRepository.create(book);
    return this.createReponse(book);
  }

  private createReponse(book: Book): CreateBookUseCase.Response {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      image: book.image,
      publisher: book.publisher,
      year: book.year,
    };
  }
}
