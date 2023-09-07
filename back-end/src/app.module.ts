import { Module } from '@nestjs/common';

import { CreateBookService } from '@/services/books/create-book';
import { GetBookByIdService } from '@/services/books/get-book-by-id';
import { CreateTradeService } from '@/services/trades/create-trade';
import { UpdateTradeService } from '@/services/trades/update-trade';

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
    { provide: 'CreateBook', useClass: CreateBookService },
    { provide: 'GetBookById', useClass: GetBookByIdService },
    { provide: 'TradeBook', useClass: CreateTradeService },
    { provide: 'UpdateTrade', useClass: UpdateTradeService },
    { provide: 'BookRepository', useClass: PrismaBookRepository },
    { provide: 'TradeRepository', useClass: PrismaTradeRepository },
  ],
})
export class AppModule {}
