import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/services/prisma.service';
import { Book, Trade } from '@/books/domain/entities';
import { TradeStatus } from '@/books/domain/types';

import { TradeRepository } from './trade-repository.interface';

@Injectable()
export class PrismaTradeRepository implements TradeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(userId: string, id: string): Promise<Trade> {
    const trade = await this.prismaService.trades.findUnique({
      where: { id, usersId: userId },
      include: { Book: true },
    });

    return new Trade({
      id: trade.id,
      message: trade.message,
      status: trade.status as TradeStatus,
      book: new Book(trade.Book),
    });
  }

  async create(trade: Trade): Promise<Trade> {
    const created = await this.prismaService.trades.create({
      data: {
        id: trade.id,
        message: trade.message,
        status: trade.status,
        bookId: trade.book.id,
        usersId: trade.user,
      },

      include: { Book: true },
    });

    return new Trade({
      id: created.id,
      message: created.message,
      status: created.status as TradeStatus,
      book: new Book(created.Book),
    });
  }

  async update(trade: Trade): Promise<Trade> {
    const updated = await this.prismaService.trades.update({
      where: { id: trade.id, usersId: trade.user },
      data: { message: trade.message, status: trade.status },
      include: { Book: true },
    });

    return new Trade({
      id: updated.id,
      message: updated.message,
      status: updated.status as TradeStatus,
      book: new Book(updated.Book),
    });
  }
}
