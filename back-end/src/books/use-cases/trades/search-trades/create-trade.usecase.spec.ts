import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { Tokens } from '@/books/settings/tokens';
import { TradeRepository } from '@/books/repositories';
import { Book, Trade } from '@/books/domain/entities';
import { TradeStatus } from '@/books/domain/types';
import { SearchTradesUseCaseImpl } from './search-trades.usecase';
import { SearchTradesUseCase } from './search-trades.interface';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: jest.fn().mockReturnValue('bc5c8e33-a815-4c77-9268-6363ee95529a'),
}));

describe('CreateTradeService', () => {
  let sut: SearchTradesUseCaseImpl;
  let tradeRepository: TradeRepository;

  let params: SearchTradesUseCase.Params;
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
        SearchTradesUseCaseImpl,
        {
          provide: Tokens.TradeRepository,
          useValue: {
            search: jest.fn().mockResolvedValue({
              pagination: { page: 1, limit: 10, total: 3 },
              trades: [trade, trade, trade],
            }),
          },
        },
      ],
    }).compile();

    sut = app.get<SearchTradesUseCaseImpl>(SearchTradesUseCaseImpl);
    tradeRepository = app.get<TradeRepository>(Tokens.TradeRepository);

    params = {
      limit: faker.number.int({ min: 1, max: 10 }),
      page: faker.number.int({ min: 1, max: 10 }),
      scope: 'requester',
      status: TradeStatus.PENDING,
      userId: faker.string.uuid(),
    };
  });

  it('should call TradeRepository.search with the correct params', async () => {
    await sut.search(params);

    expect(tradeRepository.search).toHaveBeenCalledWith(params);
  });

  it('should return the trades', async () => {
    const got = await sut.search(params);

    const expectedTrade = {
      id: trade.id,
      status: trade.status,
      message: trade.message,
      book: {
        id: trade.book.id,
        title: trade.book.title,
        image: trade.book.image,
      },
      requester: {
        id: trade.requester.id,
        name: trade.requester.name,
        username: trade.requester.username,
      },
    };

    const expected = {
      pagination: { page: 1, limit: 10, total: 3 },
      trades: [expectedTrade, expectedTrade, expectedTrade],
    };

    expect(got).toEqual(expected);
  });
});
