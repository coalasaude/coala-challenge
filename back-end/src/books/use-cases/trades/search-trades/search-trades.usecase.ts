import { Inject, Injectable } from '@nestjs/common';
import { SearchTradesUseCase } from './search-trades.interface';
import { Tokens } from '@/books/settings/tokens';
import { TradeRepository } from '@/books/infrastructure/repositories';

@Injectable()
export class SearchTradesUseCaseImpl implements SearchTradesUseCase {
  constructor(@Inject(Tokens.TradeRepository) private readonly tradeRepository: TradeRepository) {}

  async search(params: SearchTradesUseCase.Params): Promise<SearchTradesUseCase.Response> {
    const trades = await this.tradeRepository.search({ ...params, page: params.page ?? 1, limit: params.limit ?? 10 });

    return {
      pagination: trades.pagination,
      trades: trades.trades.map((trade) => ({
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
      })),
    };
  }
}
