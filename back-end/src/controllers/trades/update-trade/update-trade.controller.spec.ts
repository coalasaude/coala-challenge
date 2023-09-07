import * as Crypto from 'crypto';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { NotFoundError } from '@/domain/errors';
import { CreateTrade } from '@/services/trades/create-trade';

import * as UpdateTradeDTO from './update-trade.dto';
import { UpdateTradeController } from './update-trade.controller';
import { TradeStatus } from '@/domain/types';
import { Trade } from '@/domain/entities';
import { UpdateTrade } from '@/services/trades/update-trade';

describe('UpdateTradeController', () => {
  let updateTradeController: UpdateTradeController;
  let updateTradeService: UpdateTrade;

  let params: UpdateTradeDTO.Request & { id: string };
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
      controllers: [UpdateTradeController],
      providers: [
        {
          provide: 'UpdateTrade',
          useValue: {
            update: jest.fn().mockResolvedValue(trade),
          },
        },
      ],
    }).compile();

    updateTradeController = app.get<UpdateTradeController>(UpdateTradeController);
    updateTradeService = app.get<UpdateTrade>('UpdateTrade');

    params = {
      id: Crypto.randomUUID(),
      status: TradeStatus.ACCEPTED,
    };
  });

  describe('/books/:id/trade', () => {
    it('should call the TradeBookService with correct params', async () => {
      await updateTradeController.trade(params.id, { status: params.status });
      expect(updateTradeService.update).toHaveBeenCalledWith(params);
    });

    it('should return not found exception', async () => {
      jest.spyOn(updateTradeService, 'update').mockRejectedValue(new NotFoundError('Trade not found'));

      const expected = new NotFoundException('Trade not found');

      await expect(updateTradeController.trade(params.id, { status: params.status })).rejects.toEqual(expected);
    });

    it('should throw an error if the service throws', async () => {
      jest.spyOn(updateTradeService, 'update').mockRejectedValue(new Error());

      await expect(updateTradeController.trade(params.id, { status: params.status })).rejects.toThrow();
    });

    it('should return the trade on created', async () => {
      const got = await updateTradeController.trade(params.id, { status: params.status });

      const expected = trade;

      expect(got).toEqual(expected);
    });
  });
});
