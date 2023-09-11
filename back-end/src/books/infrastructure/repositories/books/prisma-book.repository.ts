import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/services/prisma.service';
import { Book } from '@/books/domain/entities';

import { BookRepository, GetByIdParams, SearchParams, SearchResponse } from './book-repository.interface';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async update(book: Book): Promise<Book> {
    const updated = await this.prismaService.books.update({
      where: { id: book.id },
      data: {
        title: book.title,
        description: book.description,
        author: book.author,
        image: book.image,
        year: book.year,
      },
    });

    return new Book({ ...updated, user: book.user });
  }

  async search(params: SearchParams): Promise<SearchResponse> {
    const { q, page, limit } = params;

    const books = await this.prismaService.books.findMany({
      where: { title: { contains: q, mode: 'insensitive' } },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.prismaService.books.count({
      where: { title: { contains: q, mode: 'insensitive' } },
    });

    return {
      pagination: {
        page,
        limit,
        total,
      },

      books: books.map((book) => new Book({ ...book, user: book.usersId })),
    };
  }

  async getById({ id }: GetByIdParams): Promise<Book> {
    const book = await this.prismaService.books.findUnique({ where: { id } });
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
