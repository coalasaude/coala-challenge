import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth/auth.module';
import { BooksModule } from '@/books/books.module';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [AuthModule, BooksModule, CommonModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
