import { Inject, Injectable } from '@nestjs/common';
import { SearchBooksUseCase } from './search-books.interface';
import { Tokens } from '@/books/settings/tokens';
import { BookRepository } from '@/books/infrastructure/repositories';

@Injectable()
export class SearchBooksUseCaseImpl implements SearchBooksUseCase {
  constructor(@Inject(Tokens.BookRepository) private readonly bookRepository: BookRepository) {}

  async search({ q, page, limit }: SearchBooksUseCase.Params): Promise<SearchBooksUseCase.Response> {
    const books = await this.bookRepository.search({ q, page: page ?? 1, limit: limit ?? 10 });

    return {
      pagination: books.pagination,
      books: books.books.map((book) => ({
        id: book.id,
        title: book.title,
        image: book.image,
      })),
    };
  }
}
