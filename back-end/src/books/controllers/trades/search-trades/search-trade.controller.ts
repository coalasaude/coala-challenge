import { Controller, Get, Inject, Query, Req } from '@nestjs/common';

import { Public } from '@/auth/decorators';
import { Tokens } from '@/books/settings/tokens';
import { SearchTradesService } from '@/books/services/trades';

import { SearchParams, Response } from './search-trades.dto';

@Controller('/trades')
export class SearchTradesController {
  constructor(@Inject(Tokens.SearchTradesService) private readonly searchTradesService: SearchTradesService) {}

  @Get()
  async create(@Req() request, @Query() search: SearchParams): Promise<Response> {
    const trades = await this.searchTradesService.search({ ...search, userId: request.user.id });
    return trades;
  }
}
