import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { Tokens } from '@/books/settings/tokens';
import { BookRepository } from '@/books/repositories';
import { Book } from '@/books/domain/entities';

import { CreateBookServiceImpl } from './create-book.service';
import { CreateBookService } from './create-book.interface';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: jest.fn().mockReturnValue('bc5c8e33-a815-4c77-9268-6363ee95529a'),
}));

describe('CreateBookService', () => {
  let sut: CreateBookServiceImpl;
  let bookRepository: BookRepository;

  let params: CreateBookService.Params;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBookServiceImpl,
        {
          provide: Tokens.BookRepository,
          useValue: { create: jest.fn().mockImplementation((book: Book) => book) },
        },
      ],
    }).compile();

    sut = app.get<CreateBookServiceImpl>(CreateBookServiceImpl);
    bookRepository = app.get<BookRepository>(Tokens.BookRepository);

    params = {
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      publisher: faker.company.name(),
      year: faker.number.int({ min: 1900, max: 2023 }),
      image: faker.image.url(),
    };
  });

  it('should call the repository with a book entity', async () => {
    await sut.create(params);

    const expected = new Book(params);

    expect(bookRepository.create).toHaveBeenCalledWith(expected);
  });

  it('should return the created book', async () => {
    const got = await sut.create(params);

    const expected = {
      id: 'bc5c8e33-a815-4c77-9268-6363ee95529a',
      title: params.title,
      author: params.author,
      description: params.description,
      publisher: params.publisher,
      year: params.year,
      image: params.image,
    };

    expect(got).toEqual(expected);
  });
});
