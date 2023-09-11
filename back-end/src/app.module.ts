import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth/auth.module';
import { BooksModule } from '@/books/books.module';
import { CommonModule } from '@/common/common.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, BooksModule, CommonModule, UsersModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
