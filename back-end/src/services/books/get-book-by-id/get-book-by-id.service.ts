import { Inject, Injectable } from '@nestjs/common';

import { NotFoundError } from '@/domain/errors';
import { BookRepository } from '@/repositories';

import { GetBookByIdService } from './get-book-by-id.interface';

@Injectable()
export class GetBookByIdServiceImpl implements GetBookByIdService {
  constructor(@Inject('BookRepository') private readonly bookRepository: BookRepository) {}

  async getById({ id }: GetBookByIdService.Params): Promise<GetBookByIdService.Response> {
    const book = await this.bookRepository.getById(id);

    if (!book) throw new NotFoundError('Book not found');

    return book;
  }
}
