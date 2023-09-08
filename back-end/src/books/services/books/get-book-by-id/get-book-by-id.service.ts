import { Inject, Injectable } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { NotFoundError } from '@/books/domain/errors';
import { BookRepository } from '@/books/repositories';

import { GetBookByIdService } from './get-book-by-id.interface';

@Injectable()
export class GetBookByIdServiceImpl implements GetBookByIdService {
  constructor(@Inject(Tokens.BookRepository) private readonly bookRepository: BookRepository) {}

  async getById({ id }: GetBookByIdService.Params): Promise<GetBookByIdService.Response> {
    const book = await this.bookRepository.getById({ id });

    if (!book) throw new NotFoundError('Book not found');

    return book;
  }
}
