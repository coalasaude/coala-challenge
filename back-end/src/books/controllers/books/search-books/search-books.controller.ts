import { Controller, Get, Inject, Query } from '@nestjs/common';

import { Public } from '@/auth/decorators';
import { Tokens } from '@/books/settings/tokens';
import { SearchBooksService } from '@/books/services/books';

import { SearchParams, Response } from './search-books.dto';

@Controller('/books')
export class SearchBooksController {
  constructor(@Inject(Tokens.SearchBooksService) private readonly searchBooksService: SearchBooksService) {}

  @Public()
  @Get()
  async create(@Query() search: SearchParams): Promise<Response> {
    const books = await this.searchBooksService.search(search);
    return books;
  }
}
