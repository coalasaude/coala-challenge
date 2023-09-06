import { Module } from '@nestjs/common';

import { CreateBookController } from '@/controllers/books/create-book';
import { CreateBookService } from '@/services/books/create-book';
import { GetBookByIdService } from '@/services/books/get-book-by-id';
import { GetBookByIdController } from '@/controllers/books/get-book-by-id';
import { PrismaService, PrismaBookRepository } from '@/repositories';

@Module({
  imports: [],
  controllers: [CreateBookController, GetBookByIdController],
  providers: [
    PrismaService,
    { provide: 'CreateBook', useClass: CreateBookService },
    { provide: 'BookRepository', useClass: PrismaBookRepository },
    { provide: 'GetBookById', useClass: GetBookByIdService },
  ],
})
export class AppModule {}
