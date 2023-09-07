import { Inject, Injectable } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { NotFoundError } from '@/books/domain/errors';
import { Trade } from '@/books/domain/entities';
import { BookRepository, TradeRepository } from '@/books/repositories';

import { CreateTradeService } from './create-trade.interface';

@Injectable()
export class CreateTradeServiceImpl implements CreateTradeService {
  constructor(
    @Inject(Tokens.BookRepository) private readonly bookRepository: BookRepository,
    @Inject(Tokens.TradeRepository) private readonly tradeRepository: TradeRepository,
  ) {}

  async create({ userId, bookId, message }: CreateTradeService.Params): Promise<CreateTradeService.Response> {
    const book = await this.bookRepository.getById({ id: bookId });

    if (!book) throw new NotFoundError('Book not found');

    let trade = new Trade({ message, book, user: userId });
    trade = await this.tradeRepository.create(trade);

    return this.createResponse(trade);
  }

  private createResponse(trade: Trade): CreateTradeService.Response {
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
