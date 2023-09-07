import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/services/prisma.service';
import { Book } from '@/books/domain/entities';

import { BookRepository, GetByIdParams } from './book-repository.interface';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getById({ id, userId }: GetByIdParams): Promise<Book> {
    const book = await this.prismaService.books.findUnique({ where: { id, usersId: userId } });
    return book && new Book({ ...book, user: book.usersId });
  }

  async create(book: Book): Promise<Book> {
    const created = await this.prismaService.books.create({
      data: {
        id: book.id,
        title: book.title,
        description: book.description,
        author: book.author,
        publisher: book.publisher,
        year: book.year,
        image: book.image,
        usersId: book.user,
      },
    });

    return new Book({ ...created, user: book.user });
  }
}
