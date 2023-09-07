import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { TradeRepository } from '@/repositories';
import { Book, Trade } from '@/domain/entities';

import { UpdateTradeService } from './update-trade.service';
import { UpdateTrade } from './update-trade.interface';
import { TradeStatus } from '@/domain/types';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: jest.fn().mockReturnValue('bc5c8e33-a815-4c77-9268-6363ee95529a'),
}));

describe('UpdateTradeService', () => {
  let sut: UpdateTradeService;
  let tradeRepository: TradeRepository;

  let params: UpdateTrade.Params;
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
    });

    trade = new Trade({
      message: faker.lorem.sentence(),
      status: TradeStatus.PENDING,
      book,
    });

    params = {
      id: trade.id,
      status: TradeStatus.ACCEPTED,
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTradeService,
        {
          provide: 'TradeRepository',
          useValue: {
            findById: jest.fn().mockResolvedValue(trade),
            update: jest.fn().mockResolvedValue({ ...trade, status: params.status }),
          },
        },
      ],
    }).compile();

    sut = app.get<UpdateTradeService>(UpdateTradeService);
    tradeRepository = app.get<TradeRepository>('TradeRepository');
  });

  it('should call the trade repository with trade id', async () => {
    await sut.update(params);

    expect(tradeRepository.findById).toHaveBeenCalledWith(params.id);
  });

  it('should return an error if trade is not found', async () => {
    jest.spyOn(tradeRepository, 'findById').mockResolvedValueOnce(null);

    await expect(sut.update(params)).rejects.toThrow('Trade not found');
  });

  it('should call the trade repository with updated trade', async () => {
    await sut.update(params);

    expect(tradeRepository.update).toHaveBeenCalledWith({ ...trade, _status: params.status });
  });

  it('should return the trade with correct status', async () => {
    const got = await sut.update(params);

    const expected = {
      id: trade.id,
      message: trade.message,
      status: params.status,
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