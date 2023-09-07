import { Controller, Inject, Param, NotFoundException, Post, Body } from '@nestjs/common';

import { TradeBook } from '@/services/books/trade-book';

import * as TradeBookDTO from './trade-book.dto';

@Controller('/books/:id')
export class TradeBookController {
  constructor(@Inject('TradeBook') private readonly tradeBookService: TradeBook) {}

  @Post('/trades')
  async trade(@Param('id') bookId: string, @Body() { message }: TradeBookDTO.Request): Promise<TradeBookDTO.Response> {
    try {
      return await this.tradeBookService.trade({ bookId, message });
    } catch (error) {
      if (error.name === 'NotFoundError') throw new NotFoundException(error.message);
      throw error;
    }
  }
}
