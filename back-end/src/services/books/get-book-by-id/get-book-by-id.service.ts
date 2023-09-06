import { Inject, Injectable } from '@nestjs/common';

import { NotFoundError } from '@/domain/errors';
import { BookRepository } from '@/repositories';

import { GetBookById } from './get-book-by-id.interface';

@Injectable()
export class GetBookByIdService implements GetBookById {
  constructor(@Inject('BookRepository') private readonly bookRepository: BookRepository) {}

  async getById({ id }: GetBookById.Params): Promise<GetBookById.Response> {
    const book = await this.bookRepository.getById(id);

    if (!book) throw new NotFoundError('Book not found');

    return book;
  }
}
