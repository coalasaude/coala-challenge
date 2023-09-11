import { Controller, Inject, Param, Get, NotFoundException, Req } from '@nestjs/common';

import { Public } from '@/auth/decorators';
import { Tokens } from '@/books/settings/tokens';
import { GetBookByIdUseCase } from '@/books/use-cases/books/get-book-by-id';

import * as GetBookByIdDTO from './get-book-by-id.dto';

@Controller('/books')
export class GetBookByIdController {
  constructor(@Inject(Tokens.GetBookByIdUseCase) private readonly getBookByIdUseCase: GetBookByIdUseCase) {}

  @Public()
  @Get('/:id')
  async create(@Param('id') id: string): Promise<GetBookByIdDTO.Response> {
    try {
      return await this.getBookByIdUseCase.getById({ id });
    } catch (error) {
      if (error.name === 'NotFoundError') throw new NotFoundException();
      throw error;
    }
  }
}
