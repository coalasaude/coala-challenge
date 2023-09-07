import { Controller, Inject, Param, NotFoundException, Post, Body } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { CreateTradeService } from '@/books/services/trades/create-trade';

import * as TradeBookDTO from './create-trade.dto';

@Controller('/books/:id')
export class CreateTradeController {
  constructor(@Inject(Tokens.CreateTradeService) private readonly createTradeService: CreateTradeService) {}

  @Post('/trades')
  async create(@Param('id') bookId: string, @Body() { message }: TradeBookDTO.Request): Promise<TradeBookDTO.Response> {
    try {
      return await this.createTradeService.create({ bookId, message });
    } catch (error) {
      if (error.name === 'NotFoundError') throw new NotFoundException(error.message);
      throw error;
    }
  }
}
