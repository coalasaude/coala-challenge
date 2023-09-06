import { Injectable } from '@nestjs/common';

import { Book } from '@/domain/entities';

import { BookRepository } from './book-repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(book: Book): Promise<Book> {
    const createdBook = await this.prismaService.books.create({
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

    return createdBook;
  }
}
