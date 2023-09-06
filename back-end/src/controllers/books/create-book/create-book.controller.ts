import { Body, Controller, Inject, Post } from '@nestjs/common';

import { CreateBook } from '@/services/books/create-book';

import * as CreateBookDTO from './create-book.dto';

@Controller('/books')
export class CreateBookController {
  constructor(@Inject('CreateBook') private readonly createBookService: CreateBook) {}

  @Post()
  async create(@Body() body: CreateBookDTO.Request): Promise<CreateBookDTO.Response> {
    return this.createBookService.create(body);
  }
}
