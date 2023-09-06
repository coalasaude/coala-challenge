import { Module } from '@nestjs/common';
import { CreateBookController } from './controllers/books/create-book';
import { CreateBookService } from './services/books/create-book/create-book.service';
import { PostgresBookRepository } from './repositories/book.repository';

@Module({
  imports: [],
  controllers: [CreateBookController],
  providers: [
    { provide: 'CreateBook', useClass: CreateBookService },
    { provide: 'BookRepository', useClass: PostgresBookRepository },
  ],
})
export class AppModule {}
