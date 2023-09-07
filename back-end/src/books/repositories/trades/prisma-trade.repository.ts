import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/services/prisma.service';
import { Trade } from '@/books/domain/entities';
import { TradeStatus } from '@/books/domain/types';

import { TradeRepository } from './trade-repository.interface';

@Injectable()
export class PrismaTradeRepository implements TradeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<Trade> {
    const trade = await this.prismaService.trades.findUnique({
      where: { id },
      include: { Book: true },
    });

    return new Trade({
      id: trade.id,
      message: trade.message,
      status: trade.status as TradeStatus,
      book: trade.Book,
    });
  }

  async create(trade: Trade): Promise<Trade> {
    const created = await this.prismaService.trades.create({
      data: {
        id: trade.id,
        message: trade.message,
        status: trade.status,
        bookId: trade.book.id,
      },

      include: { Book: true },
    });

    return new Trade({
      id: created.id,
      message: created.message,
      status: created.status as TradeStatus,
      book: created.Book,
    });
  }

  async update(trade: Trade): Promise<Trade> {
    const updated = await this.prismaService.trades.update({
      where: { id: trade.id },
      data: { message: trade.message, status: trade.status },
      include: { Book: true },
    });

    return new Trade({
      id: updated.id,
      message: updated.message,
      status: updated.status as TradeStatus,
      book: updated.Book,
    });
  }
}
