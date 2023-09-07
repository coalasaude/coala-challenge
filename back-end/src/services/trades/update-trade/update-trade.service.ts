import { Inject, Injectable } from '@nestjs/common';

import { NotFoundError } from '@/domain/errors';
import { BookRepository, TradeRepository } from '@/repositories';

import { UpdateTrade } from './update-trade.interface';
import { Trade } from '@/domain/entities';

@Injectable()
export class UpdateTradeService implements UpdateTrade {
  constructor(@Inject('TradeRepository') private readonly tradeRepository: TradeRepository) {}

  async update({ id, status }: UpdateTrade.Params): Promise<UpdateTrade.Response> {
    const trade = await this.tradeRepository.findById(id);

    if (!trade) throw new NotFoundError('Trade not found');

    trade.status = status;
    await this.tradeRepository.update(trade);

    return this.createResponse(trade);
  }

  private createResponse(trade: Trade): UpdateTrade.Response {
    return {
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
  }
}
