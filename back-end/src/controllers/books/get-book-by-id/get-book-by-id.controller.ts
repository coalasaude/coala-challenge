import { Controller, Inject, Param, Get, NotFoundException } from '@nestjs/common';

import { GetBookByIdService } from '@/services/books/get-book-by-id';

import * as GetBookByIdDTO from './get-book-by-id.dto';

@Controller('/books')
export class GetBookByIdController {
  constructor(@Inject('GetBookById') private readonly getBookByIdService: GetBookByIdService) {}

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
