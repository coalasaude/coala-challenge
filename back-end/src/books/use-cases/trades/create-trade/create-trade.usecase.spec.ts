import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { Tokens } from '@/books/settings/tokens';
import { BookRepository, TradeRepository } from '@/books/infrastructure/repositories';
import { Book, Trade } from '@/books/domain/entities';
import { TradeStatus } from '@/books/domain/types';

import { CreateTradeUseCaseImpl } from './create-trade.usecase';
import { CreateTradeUseCase } from './create-trade.interface';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: jest.fn().mockReturnValue('bc5c8e33-a815-4c77-9268-6363ee95529a'),
}));

describe('CreateTradeService', () => {
  let sut: CreateTradeUseCaseImpl;
  let bookRepository: BookRepository;
  let tradeRepository: TradeRepository;

  let params: CreateTradeUseCase.Params;
  let trade: Trade;
  let book: Book;

  beforeEach(async () => {
    book = new Book({
      id: faker.string.uuid(),
      title: faker.lorem.words(),
      publisher: faker.lorem.words(),
      author: faker.person.fullName(),
      year: faker.number.int({ min: 1900, max: 2023 }),
      description: faker.lorem.paragraph(),
      image: faker.image.url(),
      user: 'book_owner_id',
    });

    trade = new Trade({
      message: faker.lorem.sentence(),
      status: TradeStatus.PENDING,
      book,
      requester: { id: 'requester_id' },
    });

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTradeUseCaseImpl,
        {
          provide: Tokens.BookRepository,
          useValue: { getById: jest.fn().mockResolvedValue(book) },
        },
        {
          provide: Tokens.TradeRepository,
          useValue: { create: jest.fn().mockResolvedValue(trade) },
        },
      ],
    }).compile();

    sut = app.get<CreateTradeUseCaseImpl>(CreateTradeUseCaseImpl);
    bookRepository = app.get<BookRepository>(Tokens.BookRepository);
    tradeRepository = app.get<TradeRepository>(Tokens.TradeRepository);

    params = {
      userId: 'requester_id',
      bookId: book.id,
      message: trade.message,
    };
  });

  it('should call the book repository with a book id', async () => {
    await sut.create(params);

    expect(bookRepository.getById).toHaveBeenCalledWith({ id: params.bookId });
  });

  it('should throw a not found error if the book does not exist', async () => {
    jest.spyOn(bookRepository, 'getById').mockResolvedValueOnce(undefined);
    await expect(sut.create(params)).rejects.toThrowError('Book not found');
  });

  it('should call the trade repository with a trade', async () => {
    await sut.create(params);

    expect(tradeRepository.create).toHaveBeenCalledWith(trade);
  });

  it('should throw NotFountError if the book does not exist', async () => {
    jest.spyOn(bookRepository, 'getById').mockResolvedValueOnce(undefined);
    await expect(sut.create(params)).rejects.toThrowError('Book not found');
  });

  it('should throw a CannotCreateTradeError if the user is the book owner', async () => {
    jest.spyOn(bookRepository, 'getById').mockResolvedValueOnce({ ...book, user: params.userId });
    await expect(sut.create(params)).rejects.toThrowError('Cannot create trade');
  });

  it('should return the trade', async () => {
    const got = await sut.create(params);

    const expected = {
      id: trade.id,
      message: trade.message,
      status: trade.status,
      book: {
        id: trade.book.id,
        title: trade.book.title,
        publisher: trade.book.publisher,
        author: trade.book.author,
        year: trade.book.year,
        description: trade.book.description,
        image: trade.book.image,
      },
    };

    expect(got).toEqual(expected);
  });
});
