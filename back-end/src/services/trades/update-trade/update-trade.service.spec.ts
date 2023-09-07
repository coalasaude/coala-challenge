import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { Tokens } from '@/settings/tokens';
import { TradeStatus } from '@/domain/types';
import { Book, Trade } from '@/domain/entities';
import { TradeRepository } from '@/repositories';

import { UpdateTradeServiceImpl } from './update-trade.service';
import { UpdateTradeService } from './update-trade.interface';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: jest.fn().mockReturnValue('bc5c8e33-a815-4c77-9268-6363ee95529a'),
}));

describe('UpdateTradeService', () => {
  let sut: UpdateTradeServiceImpl;
  let tradeRepository: TradeRepository;

  let params: UpdateTradeService.Params;
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
        UpdateTradeServiceImpl,
        {
          provide: Tokens.TradeRepository,
          useValue: {
            findById: jest.fn().mockResolvedValue(trade),
            update: jest.fn().mockResolvedValue({ ...trade, status: params.status }),
          },
        },
      ],
    }).compile();

    sut = app.get<UpdateTradeServiceImpl>(UpdateTradeServiceImpl);
    tradeRepository = app.get<TradeRepository>(Tokens.TradeRepository);
  });

  it('should call the trade repository with trade id', async () => {
    await sut.update(params);

    expect(tradeRepository.findById).toHaveBeenCalledWith(params.id);
  });

  it('should return an error if trade is not found', async () => {
    jest.spyOn(tradeRepository, 'findById').mockResolvedValueOnce(null);

    await expect(sut.update(params)).rejects.toThrow('Trade not found');
  });

  it('should call the trade repository with REJECTED status', async () => {
    await sut.update({ ...params, status: TradeStatus.REJECTED });

    expect(tradeRepository.update).toHaveBeenCalledWith({ ...trade, _status: TradeStatus.REJECTED });
  });

  it('should call the trade repository with ACCEPTED status', async () => {
    jest.spyOn(tradeRepository, 'findById').mockResolvedValueOnce(
      new Trade({
        message: trade.message,
        book: trade.book,
        status: TradeStatus.ACCEPTED,
      }),
    );

    await sut.update({ ...params, status: TradeStatus.PENDING });

    expect(tradeRepository.update).toHaveBeenCalledWith({ ...trade, _status: TradeStatus.ACCEPTED });
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
