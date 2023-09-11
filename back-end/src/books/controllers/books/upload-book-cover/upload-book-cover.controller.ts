import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  FileTypeValidator,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';
import { NotFoundError } from '@/books/domain/errors';
import { UploadBookCoverUseCase } from '@/books/use-cases/books';

@Controller('/books')
export class UploadBookCoverController {
  constructor(@Inject(Tokens.UploadBookCoverUseCase) private readonly uploadBookCoverUseCase: UploadBookCoverUseCase) {}

  @Post('/:id/upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    file: Express.Multer.File,
    @Param('id') bookId: string,
    @Req() request,
  ) {
    try {
      const book = this.uploadBookCoverUseCase.upload({
        userId: request.user.id,
        bookId,
        file: file.buffer,
        mimetype: file.mimetype,
      });

      return book;
    } catch (error) {
      if (error === NotFoundError.constructor.name) throw new NotFoundException(error.message);

      throw error;
    }
  }
}
