import { Module } from '@nestjs/common';

import { CreateBookServiceImpl } from '@/services/books/create-book';
import { GetBookByIdServiceImpl } from '@/services/books/get-book-by-id';
import { CreateTradeServiceImpl } from '@/services/trades/create-trade';
import { UpdateTradeServiceImpl } from '@/services/trades/update-trade';

import { CreateBookController } from '@/controllers/books/create-book';
import { GetBookByIdController } from '@/controllers/books/get-book-by-id';
import { CreateTradeController } from '@/controllers/trades/create-trade';
import { UpdateTradeController } from '@/controllers/trades/update-trade';

import { PrismaService, PrismaBookRepository, PrismaTradeRepository } from '@/repositories';
import { Tokens } from './settings/tokens';

@Module({
  imports: [],
  controllers: [CreateBookController, GetBookByIdController, CreateTradeController, UpdateTradeController],
  providers: [
    PrismaService,
    { provide: Tokens.CreateBookService, useClass: CreateBookServiceImpl },
    { provide: Tokens.GetBookByIdService, useClass: GetBookByIdServiceImpl },
    { provide: Tokens.CreateTradeService, useClass: CreateTradeServiceImpl },
    { provide: Tokens.UpdateTradeService, useClass: UpdateTradeServiceImpl },
    { provide: Tokens.BookRepository, useClass: PrismaBookRepository },
    { provide: Tokens.TradeRepository, useClass: PrismaTradeRepository },
  ],
})
export class AppModule {}
