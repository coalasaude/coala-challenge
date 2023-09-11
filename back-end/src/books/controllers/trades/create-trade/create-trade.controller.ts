import { Controller, Inject, Param, NotFoundException, Post, Body, Req, BadRequestException } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { CreateTradeUseCase } from '@/books/use-cases/trades/create-trade';

import * as TradeBookDTO from './create-trade.dto';

@Controller('/books/:id')
export class CreateTradeController {
  constructor(@Inject(Tokens.CreateTradeUseCase) private readonly createTradeUseCase: CreateTradeUseCase) {}

  @Post('/trades')
  async create(
    @Req() request,
    @Param('id') bookId: string,
    @Body() { message }: TradeBookDTO.Request,
  ): Promise<TradeBookDTO.Response> {
    try {
      return await this.createTradeUseCase.create({ userId: request.user.id, bookId, message });
    } catch (error) {
      if (error.name === 'NotFoundError') throw new NotFoundException(error.message);
      if (error.name === 'CannotCreateTradeError') throw new BadRequestException(error.message);

      throw error;
    }
  }
}
