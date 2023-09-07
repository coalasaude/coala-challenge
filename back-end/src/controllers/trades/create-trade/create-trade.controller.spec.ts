import * as Crypto from 'crypto';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { NotFoundError } from '@/domain/errors';
import { TradeBook } from '@/services/books/trade-book';

import * as TradeBookDTO from './create-trade.dto';
import { CreateTradeController } from './create-trade.controller';
import { TradeStatus } from '@/domain/types';
import { Trade } from '@/domain/entities';

describe('CreateTradeController', () => {
  let createTradeController: CreateTradeController;
  let tradeBookService: TradeBook;

  let params: TradeBookDTO.Request & { bookId: string };
  let trade: Trade;

  beforeEach(async () => {
    trade = new Trade({
      message: faker.lorem.sentence(),
      status: TradeStatus.PENDING,
      book: {
        id: faker.string.uuid(),
        title: faker.lorem.words(),
        publisher: faker.lorem.words(),
        author: faker.person.fullName(),
        year: faker.number.int({ min: 1900, max: 2023 }),
        description: faker.lorem.paragraph(),
        image: faker.image.url(),
      },
    });

    const app: TestingModule = await Test.createTestingModule({
      controllers: [CreateTradeController],
      providers: [
        {
          provide: 'TradeBook',
          useValue: {
            trade: jest.fn().mockResolvedValue(trade),
          },
        },
      ],
    }).compile();

    createTradeController = app.get<CreateTradeController>(CreateTradeController);
    tradeBookService = app.get<TradeBook>('TradeBook');

    params = {
      bookId: Crypto.randomBytes(16).toString('hex'),
      message: faker.lorem.sentence(),
    };
  });

  describe('/books/:id/trade', () => {
    it('should call the TradeBookService with correct params', async () => {
      await createTradeController.trade(params.bookId, { message: params.message });
      expect(tradeBookService.trade).toHaveBeenCalledWith(params);
    });

    it('should return not found exception', async () => {
      jest.spyOn(tradeBookService, 'trade').mockRejectedValue(new NotFoundError('Book not found'));

      const expected = new NotFoundException();

      await expect(createTradeController.trade(params.bookId, { message: params.message })).rejects.toEqual(expected);
    });

    it('should return the trade on created', async () => {
      const got = await createTradeController.trade(params.bookId, { message: params.message });

      const expected = trade;

      expect(got).toEqual(expected);
    });
  });
});
