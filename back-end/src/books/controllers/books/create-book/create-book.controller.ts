import { Body, Controller, Inject, Post, Req } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { CreateBookService } from '@/books/services/books/create-book';

import * as CreateBookDTO from './create-book.dto';

@Controller('/books')
export class CreateBookController {
  constructor(@Inject(Tokens.CreateBookService) private readonly createBookService: CreateBookService) {}

  @Post()
  async create(@Req() request, @Body() body: CreateBookDTO.Request): Promise<CreateBookDTO.Response> {
    return this.createBookService.create({ ...body, user: request.user.id });
  }
}
