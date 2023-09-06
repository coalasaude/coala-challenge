import { Injectable } from '@nestjs/common';

import { Book } from '@/domain/entities';

import { BookRepository } from './book-repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getById(id: string): Promise<Book> {
    return this.prismaService.books.findUnique({ where: { id } });
  }

  create(book: Book): Promise<Book> {
    return this.prismaService.books.create({
      data: {
        id: book.id,
        title: book.title,
        description: book.description,
        author: book.author,
        publisher: book.publisher,
        year: book.year,
        image: book.image,
      },
    });
  }
}
