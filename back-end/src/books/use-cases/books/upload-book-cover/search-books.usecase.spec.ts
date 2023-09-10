import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { Tokens } from '@/books/settings/tokens';
import { BookRepository } from '@/books/infrastructure/repositories';
import { Book } from '@/books/domain/entities';

import { UploadBookCoverUseCase } from './upload-book-cover.interface';
import { UploadBookCoverUseCaseImpl } from './upload-book-cover.usecase';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: jest.fn().mockReturnValue('randomUUID'),
}));

describe('UploadBookCoverUseCase', () => {
  let sut: UploadBookCoverUseCase;
  let bookRepository: BookRepository;

  let params: UploadBookCoverUseCase.Params;
  let book: Book;

  beforeEach(async () => {
    book = new Book({
      id: faker.string.uuid(),
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      publisher: faker.company.name(),
      year: faker.number.int({ min: 1900, max: 2023 }),
      user: faker.string.uuid(),
    });

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UploadBookCoverUseCaseImpl,
        {
          provide: Tokens.BookRepository,
          useValue: {
            getById: jest.fn().mockResolvedValue(book),
            update: jest.fn().mockResolvedValue(book),
          },
        },
        {
          provide: Tokens.Storage,
          useValue: {
            upload: jest.fn().mockResolvedValue({ url: `books/${book.user}/${book.id}/cover.jpg` }),
          },
        },
      ],
    }).compile();

    sut = app.get<UploadBookCoverUseCase>(UploadBookCoverUseCaseImpl);
    bookRepository = app.get<BookRepository>(Tokens.BookRepository);

    params = {
      userId: book.user,
      bookId: book.id,
      file: Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
      mimetype: 'image/jpeg',
    };
  });

  it('should call BookRepository.upload with the correct params', async () => {
    await sut.upload(params);

    const expected = { id: params.bookId, userId: params.userId };

    expect(bookRepository.getById).toHaveBeenCalledWith(expected);
  });

  it('should throw NotFoundError if BookRepository.getById returns null', async () => {
    (bookRepository.getById as jest.Mock).mockResolvedValueOnce(null);

    await expect(sut.upload(params)).rejects.toThrowError('Book not found');
  });

  it('should call Storage.upload with the correct params', async () => {
    await sut.upload(params);

    const expected = {
      path: `books/${params.userId}/${params.bookId}/cover.jpg`,
      file: params.file,
      mimetype: params.mimetype,
    };

    expect((sut as any).storage.upload).toHaveBeenCalledWith(expected);
  });

  it('should call BookRepository.update with the correct params', async () => {
    const expected = { ...book, image: `books/${params.userId}/${params.bookId}/cover.jpg` };

    await sut.upload(params);

    expect(bookRepository.update).toHaveBeenCalledWith(expected);
  });

  it('should return the book', async () => {
    const got = await sut.upload(params);

    const expected = {
      id: book.id,
      title: book.title,
      publisher: book.publisher,
      author: book.author,
      year: book.year,
      description: book.description,
      image: `books/${params.userId}/${params.bookId}/cover.jpg`,
    };

    expect(got).toEqual(expected);
  });
});
