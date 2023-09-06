import { Module } from '@nestjs/common';

import { CreateBookController } from '@/controllers/books/create-book';
import { CreateBookService } from '@/services/books/create-book';
import { PrismaService, PrismaBookRepository } from '@/repositories';

@Module({
  imports: [],
  controllers: [CreateBookController],
  providers: [
    PrismaService,
    { provide: 'CreateBook', useClass: CreateBookService },
    { provide: 'BookRepository', useClass: PrismaBookRepository },
  ],
})
export class AppModule {}
