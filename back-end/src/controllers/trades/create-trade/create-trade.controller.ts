import { Controller, Inject, Param, NotFoundException, Post, Body } from '@nestjs/common';

import { CreateTrade } from '@/services/trades/create-trade';

import * as TradeBookDTO from './create-trade.dto';

@Controller('/books/:id')
export class CreateTradeController {
  constructor(@Inject('TradeBook') private readonly tradeBookService: CreateTrade) {}

  @Post('/trades')
  async trade(@Param('id') bookId: string, @Body() { message }: TradeBookDTO.Request): Promise<TradeBookDTO.Response> {
    try {
      return await this.tradeBookService.create({ bookId, message });
    } catch (error) {
      if (error.name === 'NotFoundError') throw new NotFoundException(error.message);
      throw error;
    }
  }
}
