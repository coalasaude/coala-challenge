import { Module } from '@nestjs/common';

import { CreateBookService } from '@/services/books/create-book';
import { GetBookByIdService } from '@/services/books/get-book-by-id';
import { TradeBookService } from '@/services/books/trade-book';

import { CreateBookController } from '@/controllers/books/create-book';
import { GetBookByIdController } from '@/controllers/books/get-book-by-id';
import { TradeBookController } from '@/controllers/books/trade-book';

import { PrismaService, PrismaBookRepository, PrismaTradeRepository } from '@/repositories';

@Module({
  imports: [],
  controllers: [CreateBookController, GetBookByIdController, TradeBookController],
  providers: [
    PrismaService,
    { provide: 'CreateBook', useClass: CreateBookService },
    { provide: 'GetBookById', useClass: GetBookByIdService },
    { provide: 'TradeBook', useClass: TradeBookService },
    { provide: 'BookRepository', useClass: PrismaBookRepository },
    { provide: 'TradeRepository', useClass: PrismaTradeRepository },
  ],
})
export class AppModule {}
