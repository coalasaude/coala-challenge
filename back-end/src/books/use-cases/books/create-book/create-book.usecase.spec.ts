import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { Tokens } from '@/books/settings/tokens';
import { BookRepository } from '@/books/infrastructure/repositories';
import { Book } from '@/books/domain/entities';

import { CreateBookUseCaseImpl } from './create-book.usecase';
import { CreateBookUseCase } from './create-book.interface';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: jest.fn().mockReturnValue('randomUUID'),
}));

describe('CreateBookService', () => {
  let sut: CreateBookUseCaseImpl;
  let bookRepository: BookRepository;

  let params: CreateBookUseCase.Params;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBookUseCaseImpl,
        {
          provide: Tokens.BookRepository,
          useValue: { create: jest.fn().mockImplementation((book: Book) => book) },
        },
      ],
    }).compile();

    sut = app.get<CreateBookUseCaseImpl>(CreateBookUseCaseImpl);
    bookRepository = app.get<BookRepository>(Tokens.BookRepository);

    params = {
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      publisher: faker.company.name(),
      year: faker.number.int({ min: 1900, max: 2023 }),
      image: faker.image.url(),
      user: 'randomUUID',
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
      id: 'randomUUID',
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
