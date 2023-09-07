import { Controller, Inject, Param, NotFoundException, Post, Body } from '@nestjs/common';

import { CreateTradeService } from '@/services/trades/create-trade';

import * as TradeBookDTO from './create-trade.dto';

@Controller('/books/:id')
export class CreateTradeController {
  constructor(@Inject('CreateTrade') private readonly createTradeService: CreateTradeService) {}

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
