import { Inject, Injectable } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { BookRepository } from '@/books/infrastructure/repositories';
import { Storage } from '@/books/infrastructure/storage';
import { Book } from '@/books/domain/entities';
import { NotFoundError } from '@/books/domain/errors';

import { UploadBookCoverUseCase } from './upload-book-cover.interface';

@Injectable()
export class UploadBookCoverUseCaseImpl implements UploadBookCoverUseCase {
  constructor(
    @Inject(Tokens.Storage) private readonly storage: Storage,
    @Inject(Tokens.BookRepository) private readonly bookRepository: BookRepository,
  ) {}

  async upload(params: UploadBookCoverUseCase.Params): Promise<UploadBookCoverUseCase.Result> {
    let book = await this.bookRepository.getById({ id: params.bookId, userId: params.userId });

    if (!book) throw new NotFoundError('Book not found');

    const path = this.generateFileName(params.userId, params.bookId, params.mimetype);
    const { url } = await this.storage.upload({ file: params.file, path, mimetype: params.mimetype });

    book.image = url;
    book = await this.bookRepository.update(book);

    return this.createResponse(book);
  }

  private generateFileName(userId: string, bookId: string, mimetype: string): string {
    return `books/${userId}/${bookId}/cover.${this.getExtension(mimetype)}`;
  }

  private getExtension(mimetype: string): string {
    const map = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
    };

    return map[mimetype] || 'jpg';
  }

  private createResponse(book: Book): UploadBookCoverUseCase.Result {
    return {
      id: book.id,
      title: book.title,
      publisher: book.publisher,
      author: book.author,
      year: book.year,
      description: book.description,
      image: book.image,
    };
  }
}
