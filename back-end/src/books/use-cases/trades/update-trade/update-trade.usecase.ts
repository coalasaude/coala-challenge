import { Inject, Injectable } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { Trade } from '@/books/domain/entities';
import { CannotUpdateTradeError, NotFoundError } from '@/books/domain/errors';
import { TradeRepository } from '@/books/infrastructure/repositories';

import { UpdateTradeService } from './update-trade.interface';

@Injectable()
export class UpdateTradeServiceImpl implements UpdateTradeService {
  constructor(@Inject(Tokens.TradeRepository) private readonly tradeRepository: TradeRepository) {}

  async update({ userId, id, status }: UpdateTradeService.Params): Promise<UpdateTradeService.Response> {
    const trade = await this.tradeRepository.findById({ id });

    if (!trade) throw new NotFoundError('Trade not found');

    const ioBookOwner = trade.book.user === userId;
    if (!ioBookOwner) throw new CannotUpdateTradeError();

    trade.status = status;
    await this.tradeRepository.update(trade);

    return this.createResponse(trade);
  }

  private createResponse(trade: Trade): UpdateTradeService.Response {
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
