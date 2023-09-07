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

@Module({
  imports: [],
  controllers: [CreateBookController, GetBookByIdController, CreateTradeController, UpdateTradeController],
  providers: [
    PrismaService,
    { provide: 'CreateBook', useClass: CreateBookServiceImpl },
    { provide: 'GetBookById', useClass: GetBookByIdServiceImpl },
    { provide: 'CreateTrade', useClass: CreateTradeServiceImpl },
    { provide: 'UpdateTrade', useClass: UpdateTradeServiceImpl },
    { provide: 'BookRepository', useClass: PrismaBookRepository },
    { provide: 'TradeRepository', useClass: PrismaTradeRepository },
  ],
})
export class AppModule {}
