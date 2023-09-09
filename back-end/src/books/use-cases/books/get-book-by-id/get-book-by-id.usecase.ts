import { Inject, Injectable } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { NotFoundError } from '@/books/domain/errors';
import { BookRepository } from '@/books/repositories';

import { GetBookByIdUseCase } from './get-book-by-id.interface';

@Injectable()
export class GetBookByIdUseCaseImpl implements GetBookByIdUseCase {
  constructor(@Inject(Tokens.BookRepository) private readonly bookRepository: BookRepository) {}

  async getById({ id }: GetBookByIdUseCase.Params): Promise<GetBookByIdUseCase.Response> {
    const book = await this.bookRepository.getById({ id });

    if (!book) throw new NotFoundError('Book not found');

    return book;
  }
}
