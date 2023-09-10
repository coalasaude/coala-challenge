import { Module } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';

import {
  CreateBookController,
  GetBookByIdController,
  SearchBooksController,
  UploadBookCoverController,
} from '@/books/controllers/books';
import { CreateTradeController, SearchTradesController, UpdateTradeController } from '@/books/controllers/trades';

import {
  CreateBookUseCaseImpl,
  GetBookByIdUseCaseImpl,
  SearchBooksUseCaseImpl,
  UploadBookCoverUseCaseImpl,
} from '@/books/use-cases/books';

import { CreateTradeUseCaseImpl, SearchTradesUseCaseImpl, UpdateTradeServiceImpl } from '@/books/use-cases/trades';

import { PrismaBookRepository, PrismaTradeRepository } from '@/books/infrastructure/repositories';

import { CommonModule } from '@/common/common.module';
import { S3Storage } from './infrastructure/storage';

@Module({
  imports: [CommonModule],
  controllers: [
    CreateBookController,
    GetBookByIdController,
    CreateTradeController,
    UpdateTradeController,
    SearchBooksController,
    SearchTradesController,
    UploadBookCoverController,
  ],
  providers: [
    { provide: Tokens.CreateBookUseCase, useClass: CreateBookUseCaseImpl },
    { provide: Tokens.GetBookByIdUseCase, useClass: GetBookByIdUseCaseImpl },
    { provide: Tokens.CreateTradeUseCase, useClass: CreateTradeUseCaseImpl },
    { provide: Tokens.UpdateTradeUseCase, useClass: UpdateTradeServiceImpl },
    { provide: Tokens.SearchBooksUseCase, useClass: SearchBooksUseCaseImpl },
    { provide: Tokens.SearchTradesUseCase, useClass: SearchTradesUseCaseImpl },
    { provide: Tokens.UploadBookCoverUseCase, useClass: UploadBookCoverUseCaseImpl },
    { provide: Tokens.BookRepository, useClass: PrismaBookRepository },
    { provide: Tokens.TradeRepository, useClass: PrismaTradeRepository },
    { provide: Tokens.Storage, useClass: S3Storage },
  ],
})
export class BooksModule {}
