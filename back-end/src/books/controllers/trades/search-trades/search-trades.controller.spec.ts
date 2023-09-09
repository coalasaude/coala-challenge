import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { Tokens } from '@/books/settings/tokens';
import { Trade } from '@/books/domain/entities';
import { TradeStatus } from '@/books/domain/types';
import { SearchTradesUseCase } from '@/books/use-cases/trades';

import * as SearchTradeDTO from './search-trades.dto';
import { SearchTradesController } from './search-trade.controller';

describe('CreateBookController', () => {
  let controller: SearchTradesController;
  let useCase: SearchTradesUseCase;

  let params: SearchTradeDTO.SearchParams;
  let request: { user: { id: string } };
  let trade: Trade;

  beforeEach(async () => {
    params = {
      limit: faker.number.int({ min: 1, max: 10 }),
      page: faker.number.int({ min: 1, max: 10 }),
      scope: 'requester',
      status: TradeStatus.PENDING,
    };

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
      controllers: [SearchTradesController],
      providers: [
        {
          provide: Tokens.SearchTradesUseCase,
          useValue: {
            search: jest.fn().mockResolvedValue({
              pagination: { page: 1, limit: 10, total: 3 },
              trades: [trade, trade, trade],
            }),
          },
        },
      ],
    }).compile();

    controller = app.get<SearchTradesController>(SearchTradesController);
    useCase = app.get<SearchTradesUseCase>(Tokens.SearchTradesUseCase);

    request = { user: { id: faker.string.uuid() } };
  });

  it('should call the SearchTradesUseCase.search with correct params', async () => {
    await controller.create(request, params);

    expect(useCase.search).toHaveBeenCalledWith({ ...params, userId: request.user.id });
  });

  it('should return the trades', async () => {
    const got = await controller.create(request, params);

    expect(got).toEqual({
      pagination: { page: 1, limit: 10, total: 3 },
      trades: [trade, trade, trade],
    });
  });
});
