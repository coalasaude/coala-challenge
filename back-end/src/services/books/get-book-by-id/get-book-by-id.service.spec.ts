import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { BookRepository } from '@/repositories';
import { Book } from '@/domain/entities';

import { GetBookByIdServiceImpl } from './get-book-by-id.service';
import { GetBookByIdService } from './get-book-by-id.interface';

describe('GetBookByIdService', () => {
  let sut: GetBookByIdServiceImpl;
  let bookRepository: BookRepository;

  let params: GetBookByIdService.Params;
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
        GetBookByIdServiceImpl,
        {
          provide: 'BookRepository',
          useValue: {
            getById: jest.fn().mockResolvedValue(book),
          },
        },
      ],
    }).compile();

    sut = app.get<GetBookByIdServiceImpl>(GetBookByIdServiceImpl);
    bookRepository = app.get<BookRepository>('BookRepository');

    params = { id: 'bc5c8e33-a815-4c77-9268-6363ee95529a' };
  });

  it('should call the repository with a book id', async () => {
    await sut.getById(params);

    expect(bookRepository.getById).toHaveBeenCalledWith(params.id);
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
