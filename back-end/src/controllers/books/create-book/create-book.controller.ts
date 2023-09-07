import { Body, Controller, Inject, Post } from '@nestjs/common';

import { Tokens } from '@/settings/tokens';
import { CreateBookService } from '@/services/books/create-book';

import * as CreateBookDTO from './create-book.dto';

@Controller('/books')
export class CreateBookController {
  constructor(@Inject(Tokens.CreateBookService) private readonly createBookService: CreateBookService) {}

  @Post()
  async create(@Body() body: CreateBookDTO.Request): Promise<CreateBookDTO.Response> {
    return this.createBookService.create(body);
  }
}
