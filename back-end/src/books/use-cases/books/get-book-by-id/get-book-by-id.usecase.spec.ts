import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { Tokens } from '@/books/settings/tokens';
import { BookRepository } from '@/books/repositories';
import { Book } from '@/books/domain/entities';

import { GetBookByIdUseCaseImpl } from './get-book-by-id.usecase';
import { GetBookByIdUseCase } from './get-book-by-id.interface';

describe('GetBookByIdService', () => {
  let sut: GetBookByIdUseCaseImpl;
  let bookRepository: BookRepository;

  let params: GetBookByIdUseCase.Params;
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
        GetBookByIdUseCaseImpl,
        {
          provide: Tokens.BookRepository,
          useValue: {
            getById: jest.fn().mockResolvedValue(book),
          },
        },
      ],
    }).compile();

    sut = app.get<GetBookByIdUseCaseImpl>(GetBookByIdUseCaseImpl);
    bookRepository = app.get<BookRepository>(Tokens.BookRepository);

    params = { id: faker.string.uuid() };
  });

  it('should call the repository with a book id', async () => {
    await sut.getById(params);

    expect(bookRepository.getById).toHaveBeenCalledWith({ id: params.id });
  });

  it('should throw a not found error if the book does not exist', async () => {
    jest.spyOn(bookRepository, 'getById').mockResolvedValueOnce(undefined);
    await expect(sut.getById(params)).rejects.toThrowError('Book not found');
  });

  it('should return the book', async () => {
    const got = await sut.getById(params);
    const expected = book;

    expect(got).toEqual(expected);
  });
});
