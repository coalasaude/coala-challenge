import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { Tokens } from '@/books/settings/tokens';
import { BookRepository } from '@/books/repositories';
import { Book } from '@/books/domain/entities';

import { SearchBooksUseCaseImpl } from './search-books.service';
import { SearchBooksUseCase } from './search-books.interface';

describe('GetBookByIdService', () => {
  let sut: SearchBooksUseCaseImpl;
  let bookRepository: BookRepository;

  let params: SearchBooksUseCase.Params;
  let book: Book;

  beforeEach(async () => {
    book = new Book({
      id: faker.string.uuid(),
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      publisher: faker.company.name(),
      year: faker.number.int({ min: 1900, max: 2023 }),
    });

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        SearchBooksUseCaseImpl,
        {
          provide: Tokens.BookRepository,
          useValue: {
            search: jest.fn().mockResolvedValue({
              pagination: { page: 1, limit: 10, total: 3 },
              books: [book, book, book],
            }),
          },
        },
      ],
    }).compile();

    sut = app.get<SearchBooksUseCaseImpl>(SearchBooksUseCaseImpl);
    bookRepository = app.get<BookRepository>(Tokens.BookRepository);

    params = {
      limit: faker.number.int({ min: 1, max: 10 }),
      page: faker.number.int({ min: 1, max: 10 }),
      q: faker.lorem.words(3),
    };
  });

  it('should call BookRepository.search with the correct params', async () => {
    await sut.search(params);

    expect(bookRepository.search).toHaveBeenCalledWith(params);
  });

  it('should return the books', async () => {
    const got = await sut.search(params);

    const expected = {
      pagination: { page: 1, limit: 10, total: 3 },
      books: [
        { id: book.id, title: book.title, image: book.image },
        { id: book.id, title: book.title, image: book.image },
        { id: book.id, title: book.title, image: book.image },
      ],
    };

    expect(got).toEqual(expected);
  });
});
