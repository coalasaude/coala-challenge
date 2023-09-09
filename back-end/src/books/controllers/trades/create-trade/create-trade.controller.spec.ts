import * as Crypto from 'crypto';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Tokens } from '@/books/settings/tokens';
import { Trade } from '@/books/domain/entities';
import { NotFoundError } from '@/books/domain/errors';
import { TradeStatus } from '@/books/domain/types';
import { CreateTradeUseCase } from '@/books/use-cases/trades/create-trade';

import { CreateTradeController } from './create-trade.controller';
import * as TradeBookDTO from './create-trade.dto';

describe('CreateTradeController', () => {
  let controller: CreateTradeController;
  let useCase: CreateTradeUseCase;

  let params: TradeBookDTO.Request & { bookId: string };
  let request: { user: { id: string } };
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
        user: faker.string.uuid(),
      },
    });

    const app: TestingModule = await Test.createTestingModule({
      controllers: [CreateTradeController],
      providers: [
        {
          provide: Tokens.CreateTradeUseCase,
          useValue: { create: jest.fn().mockResolvedValue(trade) },
        },
      ],
    }).compile();

    controller = app.get<CreateTradeController>(CreateTradeController);
    useCase = app.get<CreateTradeUseCase>(Tokens.CreateTradeUseCase);

    request = { user: { id: faker.string.uuid() } };
    params = {
      bookId: Crypto.randomBytes(16).toString('hex'),
      message: faker.lorem.sentence(),
    };
  });

  describe('/books/:id/trade', () => {
    it('should call the TradeBookService with correct params', async () => {
      await controller.create(request, params.bookId, { message: params.message });
      expect(useCase.create).toHaveBeenCalledWith({ ...params, userId: request.user.id });
    });

    it('should return not found exception', async () => {
      jest.spyOn(useCase, 'create').mockRejectedValue(new NotFoundError('Book not found'));

      const expected = new NotFoundException('Book not found');

      await expect(controller.create(request, params.bookId, { message: params.message })).rejects.toEqual(expected);
    });

    it('should throw an error if the service throws', async () => {
      jest.spyOn(useCase, 'create').mockRejectedValue(new Error());

      await expect(controller.create(request, params.bookId, { message: params.message })).rejects.toThrow();
    });

    it('should return the trade on created', async () => {
      const got = await controller.create(request, params.bookId, { message: params.message });

      const expected = trade;

      expect(got).toEqual(expected);
    });
  });
});
