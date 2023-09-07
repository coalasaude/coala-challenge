import { Inject, Injectable } from '@nestjs/common';

import { NotFoundError } from '@/domain/errors';
import { BookRepository, TradeRepository } from '@/repositories';

import { TradeBook } from './trade-book.interface';
import { Trade } from '@/domain/entities';

@Injectable()
export class TradeBookService implements TradeBook {
  constructor(
    @Inject('BookRepository') private readonly bookRepository: BookRepository,
    @Inject('TradeRepository') private readonly tradeRepository: TradeRepository,
  ) {}

  async trade({ bookId, message }: TradeBook.Params): Promise<TradeBook.Response> {
    const book = await this.bookRepository.getById(bookId);

    if (!book) throw new NotFoundError('Book not found');

    let trade = new Trade({ message, book });
    trade = await this.tradeRepository.create(trade);

    return this.createResponse(trade);
  }

  private createResponse(trade: Trade): TradeBook.Response {
    return {
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
