import { Module } from '@nestjs/common';

import { Tokens } from '@/books/settings/tokens';

import { CreateBookController, GetBookByIdController, SearchBooksController } from '@/books/controllers/books';
import { CreateTradeController, UpdateTradeController } from '@/books/controllers/trades';

import { CreateBookServiceImpl, GetBookByIdServiceImpl, SearchBooksServiceImpl } from '@/books/services/books';
import { CreateTradeServiceImpl, UpdateTradeServiceImpl } from '@/books/services/trades';

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
  ],
  providers: [
    { provide: Tokens.CreateBookService, useClass: CreateBookServiceImpl },
    { provide: Tokens.GetBookByIdService, useClass: GetBookByIdServiceImpl },
    { provide: Tokens.CreateTradeService, useClass: CreateTradeServiceImpl },
    { provide: Tokens.UpdateTradeService, useClass: UpdateTradeServiceImpl },
    { provide: Tokens.SearchBooksService, useClass: SearchBooksServiceImpl },
    { provide: Tokens.BookRepository, useClass: PrismaBookRepository },
    { provide: Tokens.TradeRepository, useClass: PrismaTradeRepository },
  ],
})
export class BooksModule {}
