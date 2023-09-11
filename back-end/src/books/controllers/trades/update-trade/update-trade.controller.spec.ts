import * as Crypto from 'crypto';
import { faker } from '@faker-js/faker';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Tokens } from '@/books/settings/tokens';
import { CannotUpdateTradeError, NotFoundError } from '@/books/domain/errors';
import { TradeStatus } from '@/books/domain/types';
import { Trade } from '@/books/domain/entities';
import { UpdateTradeService } from '@/books/use-cases/trades/update-trade';

import * as UpdateTradeDTO from './update-trade.dto';
import { UpdateTradeController } from './update-trade.controller';

describe('UpdateTradeController', () => {
  let controller: UpdateTradeController;
  let service: UpdateTradeService;

  let params: UpdateTradeDTO.Request & { id: string };
  let trade: Trade;
  let request: { user: { id: string } };

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
      controllers: [UpdateTradeController],
      providers: [
        {
          provide: Tokens.UpdateTradeUseCase,
          useValue: {
            update: jest.fn().mockResolvedValue(trade),
          },
        },
      ],
    }).compile();

    controller = app.get<UpdateTradeController>(UpdateTradeController);
    service = app.get<UpdateTradeService>(Tokens.UpdateTradeUseCase);

    params = {
      id: Crypto.randomUUID(),
      status: TradeStatus.ACCEPTED,
    };

    request = { user: { id: faker.string.uuid() } };
  });

  it('should call the TradeBookService with correct params', async () => {
    await controller.trade(request, params.id, { status: params.status });
    expect(service.update).toHaveBeenCalledWith({ ...params, userId: request.user.id });
  });

  it('should return not found exception', async () => {
    jest.spyOn(service, 'update').mockRejectedValue(new NotFoundError('Trade not found'));

    const expected = new NotFoundException('Trade not found');

    await expect(controller.trade(request, params.id, { status: params.status })).rejects.toEqual(expected);
  });

  it('should return bad request exception', async () => {
    jest.spyOn(service, 'update').mockRejectedValue(new CannotUpdateTradeError());

    const expected = new BadRequestException('Cannot update trade');

    await expect(controller.trade(request, params.id, { status: params.status })).rejects.toEqual(expected);
  });

  it('should throw an error if the service throws', async () => {
    jest.spyOn(service, 'update').mockRejectedValue(new Error());

    await expect(controller.trade(request, params.id, { status: params.status })).rejects.toThrow();
  });

  it('should return the trade on created', async () => {
    const got = await controller.trade(request, params.id, { status: params.status });

    const expected = trade;

    expect(got).toEqual(expected);
  });
});
