import { Module } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';

import { CreateBookController, GetBookByIdController, SearchBooksController } from '@/books/controllers/books';
import { CreateTradeController, SearchTradesController, UpdateTradeController } from '@/books/controllers/trades';

import { CreateBookUseCaseImpl, GetBookByIdUseCaseImpl, SearchBooksUseCaseImpl } from '@/books/use-cases/books';
import { CreateTradeUseCaseImpl, SearchTradesUseCaseImpl, UpdateTradeServiceImpl } from '@/books/use-cases/trades';

import { PrismaBookRepository, PrismaTradeRepository } from '@/books/repositories';

import { CommonModule } from '@/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [
    CreateBookController,
    GetBookByIdController,
    CreateTradeController,
    UpdateTradeController,
    SearchBooksController,
    SearchTradesController,
  ],
  providers: [
    { provide: Tokens.CreateBookUseCase, useClass: CreateBookUseCaseImpl },
    { provide: Tokens.GetBookByIdUseCase, useClass: GetBookByIdUseCaseImpl },
    { provide: Tokens.CreateTradeUseCase, useClass: CreateTradeUseCaseImpl },
    { provide: Tokens.UpdateTradeUseCase, useClass: UpdateTradeServiceImpl },
    { provide: Tokens.SearchBooksUseCase, useClass: SearchBooksUseCaseImpl },
    { provide: Tokens.SearchTradesUseCase, useClass: SearchTradesUseCaseImpl },
    { provide: Tokens.BookRepository, useClass: PrismaBookRepository },
    { provide: Tokens.TradeRepository, useClass: PrismaTradeRepository },
  ],
})
export class BooksModule {}
