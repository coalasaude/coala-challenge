import { Body, Controller, Inject, Post, Req } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { CreateBookUseCase } from '@/books/use-cases/books/create-book';

import * as CreateBookDTO from './create-book.dto';

@Controller('/books')
export class CreateBookController {
  constructor(@Inject(Tokens.CreateBookUseCase) private readonly createBookUseCase: CreateBookUseCase) {}

  @Post()
  async create(@Req() request, @Body() body: CreateBookDTO.Request): Promise<CreateBookDTO.Response> {
    return this.createBookUseCase.create({ ...body, user: request.user.id });
  }
}
