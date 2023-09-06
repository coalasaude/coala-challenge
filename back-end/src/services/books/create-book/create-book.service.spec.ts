import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { BookRepository } from '@/repositories';
import { Book } from '@/domain/entities';

import { CreateBookService } from './create-book.service';
import { CreateBook } from './create-book.interface';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: jest.fn().mockReturnValue('bc5c8e33-a815-4c77-9268-6363ee95529a'),
}));

describe('CreateBookService', () => {
  let sut: CreateBookService;
  let bookRepository: BookRepository;

  let params: CreateBook.Params;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBookService,
        {
          provide: 'BookRepository',
          useValue: { create: jest.fn().mockImplementation((book: Book) => book) },
        },
      ],
    }).compile();

    sut = app.get<CreateBookService>(CreateBookService);
    bookRepository = app.get<BookRepository>('BookRepository');

    params = {
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      publisher: faker.company.name(),
      year: faker.number.int({ min: 1900, max: 2023 }),
    };
  });

  it('should call the repository with a book entity', async () => {
    await sut.create(params);

    const expected = new Book(params);

    expect(bookRepository.create).toHaveBeenCalledWith(expected);
  });

  it('should return the created book', async () => {
    const got = await sut.create(params);
    const expected = new Book(params);

    expect(got).toEqual(expected);
  });
});
