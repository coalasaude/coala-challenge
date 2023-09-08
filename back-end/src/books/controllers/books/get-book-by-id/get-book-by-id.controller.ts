import { Controller, Inject, Param, Get, NotFoundException, Req } from '@nestjs/common';

import { Public } from '@/auth/decorators';
import { Tokens } from '@/books/settings/tokens';
import { GetBookByIdService } from '@/books/services/books/get-book-by-id';

import * as GetBookByIdDTO from './get-book-by-id.dto';

@Controller('/books')
export class GetBookByIdController {
  constructor(@Inject(Tokens.GetBookByIdService) private readonly getBookByIdService: GetBookByIdService) {}

  @Public()
  @Get('/:id')
  async create(@Param('id') id: string): Promise<GetBookByIdDTO.Response> {
    try {
      return await this.getBookByIdService.getById({ id });
    } catch (error) {
      if (error.name === 'NotFoundError') throw new NotFoundException();
      throw error;
    }
  }
}
