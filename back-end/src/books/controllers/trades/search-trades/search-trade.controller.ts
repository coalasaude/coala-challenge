import { Controller, Get, Inject, Query, Req } from '@nestjs/common';

import { Public } from '@/auth/decorators';
import { Tokens } from '@/books/settings/tokens';
import { SearchTradesUseCase } from '@/books/use-cases/trades';

import { SearchParams, Response } from './search-trades.dto';

@Controller('/trades')
export class SearchTradesController {
  constructor(@Inject(Tokens.SearchTradesUseCase) private readonly searchTradesUseCase: SearchTradesUseCase) {}

  @Get()
  async create(@Req() request, @Query() search: SearchParams): Promise<Response> {
    const trades = await this.searchTradesUseCase.search({ ...search, userId: request.user.id });
    return trades;
  }
}
