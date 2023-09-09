import { Controller, Inject, Param, NotFoundException, Body, Patch, Req, BadRequestException } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { UpdateTradeService } from '@/books/use-cases/trades/update-trade';

import * as UpdateTradeDTO from './update-trade.dto';

@Controller('/trades')
export class UpdateTradeController {
  constructor(@Inject(Tokens.UpdateTradeUseCase) private readonly updateTradeUseCase: UpdateTradeService) {}

  @Patch('/:id')
  async trade(
    @Req() request,
    @Param('id') id: string,
    @Body() { status }: UpdateTradeDTO.Request,
  ): Promise<UpdateTradeDTO.Response> {
    try {
      return await this.updateTradeUseCase.update({ userId: request.user.id, id, status });
    } catch (error) {
      if (error.name === 'NotFoundError') throw new NotFoundException(error.message);
      if (error.name === 'CannotUpdateTradeError') throw new BadRequestException(error.message);

      throw error;
    }
  }
}
