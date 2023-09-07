import { Controller, Inject, Param, NotFoundException, Post, Body, Req } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { CreateTradeService } from '@/books/services/trades/create-trade';

import * as TradeBookDTO from './create-trade.dto';
import { request } from 'http';

@Controller('/books/:id')
export class CreateTradeController {
  constructor(@Inject(Tokens.CreateTradeService) private readonly createTradeService: CreateTradeService) {}

  @Post('/trades')
  async create(
    @Req() request,
    @Param('id') bookId: string,
    @Body() { message }: TradeBookDTO.Request,
  ): Promise<TradeBookDTO.Response> {
    try {
      return await this.createTradeService.create({ userId: request.user.id, bookId, message });
    } catch (error) {
      if (error.name === 'NotFoundError') throw new NotFoundException(error.message);
      throw error;
    }
  }
}
