import { Controller, Inject, Param, NotFoundException, Body, Patch } from '@nestjs/common';

import { UpdateTrade } from '@/services/trades/update-trade';

import * as UpdateTradeDTO from './update-trade.dto';

@Controller('/trades')
export class UpdateTradeController {
  constructor(@Inject('UpdateTrade') private readonly updateTradeService: UpdateTrade) {}

  @Patch('/:id')
  async trade(@Param('id') id: string, @Body() { status }: UpdateTradeDTO.Request): Promise<UpdateTradeDTO.Response> {
    try {
      return await this.updateTradeService.update({ id, status });
    } catch (error) {
      if (error.name === 'NotFoundError') throw new NotFoundException(error.message);
      throw error;
    }
  }
}
