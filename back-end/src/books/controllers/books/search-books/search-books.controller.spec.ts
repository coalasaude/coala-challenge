import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { Tokens } from '@/books/settings/tokens';
import { Book } from '@/books/domain/entities';
import { SearchBooksUseCase } from '@/books/use-cases/books';

import * as SearchBooksDTO from './search-books.dto';
import { SearchBooksController } from './search-books.controller';

describe('SearchBooksController', () => {
  let controller: SearchBooksController;
  let useCase: SearchBooksUseCase;

  let params: SearchBooksDTO.SearchParams;
  let book: Book;

  beforeEach(async () => {
    book = new Book({
      id: faker.string.uuid(),
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      publisher: faker.company.name(),
      year: faker.number.int({ min: 1900, max: 2023 }),
      image: faker.image.url(),
      user: faker.string.uuid(),
    });

    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchBooksController],
      providers: [
        {
          provide: Tokens.SearchBooksUseCase,
          useValue: {
            search: jest.fn().mockResolvedValue({
              pagination: { page: 1, limit: 10, total: 3 },
              books: [book, book, book],
            }),
          },
        },
      ],
    }).compile();

    controller = app.get<SearchBooksController>(SearchBooksController);
    useCase = app.get<SearchBooksUseCase>(Tokens.SearchBooksUseCase);

    params = {
      limit: faker.number.int({ min: 1, max: 10 }),
      page: faker.number.int({ min: 1, max: 10 }),
      q: faker.lorem.words(3),
    };
  });

  it('should call the searchBooksService', async () => {
    await controller.create(params);
    expect(useCase.search).toHaveBeenCalledWith(params);
  });

  it('should return the books', async () => {
    const got = await controller.create(params);

    const expected = {
      pagination: { page: 1, limit: 10, total: 3 },
      books: [book, book, book],
    };

    expect(got).toEqual(expected);
  });
});
