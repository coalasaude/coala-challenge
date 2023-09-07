import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/services/prisma.service';
import { Book, Trade } from '@/books/domain/entities';
import { TradeStatus } from '@/books/domain/types';

import { TradeRepository } from './trade-repository.interface';
import { User } from '@/books/domain/entities/user.entity';

@Injectable()
export class PrismaTradeRepository implements TradeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async search({
    userId,
    status,
    page,
    limit,
    scope,
  }: TradeRepository.SearchParams): Promise<TradeRepository.SearchResponse> {
    const scopeCondition = scope === 'requester' ? { usersId: userId } : { Book: { usersId: userId } };

    const trades = await this.prismaService.trades.findMany({
      where: { status, ...scopeCondition },
      include: { Book: true, Users: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.prismaService.trades.count({ where: { status, ...scopeCondition } });

    return {
      pagination: {
        page: page,
        limit: limit,
        total: total,
      },

      trades: trades.map(
        (trade) =>
          new Trade({
            id: trade.id,
            message: trade.message,
            status: trade.status as TradeStatus,
            book: new Book({ ...trade.Book, user: trade.Book.usersId }),
            requester: trade.Users,
          }),
      ),
    };
  }

  async findById({ id, userId }: TradeRepository.FindByIdParams): Promise<Trade> {
    const trade = await this.prismaService.trades.findUnique({
      where: { id, usersId: userId },
      include: { Book: true, Users: true },
    });

    return (
      trade &&
      new Trade({
        id: trade.id,
        message: trade.message,
        status: trade.status as TradeStatus,
        book: new Book({ ...trade.Book, user: trade.Book.usersId }),
        requester: new User({
          id: trade.usersId,
          name: trade.Users.name,
          username: trade.Users.username,
        }),
      })
    );
  }

  async create(trade: Trade): Promise<Trade> {
    const created = await this.prismaService.trades.create({
      data: {
        id: trade.id,
        message: trade.message,
        status: trade.status,
        bookId: trade.book.id,
        usersId: trade.requester.id,
      },

      include: { Book: true },
    });

    return new Trade({
      id: created.id,
      message: created.message,
      status: created.status as TradeStatus,
      book: new Book({ ...created.Book, user: created.Book.usersId }),
    });
  }

  async update(trade: Trade): Promise<Trade> {
    const updated = await this.prismaService.trades.update({
      where: { id: trade.id, usersId: trade.requester.id },
      data: { message: trade.message, status: trade.status },
      include: { Book: true },
    });

    return new Trade({
      id: updated.id,
      message: updated.message,
      status: updated.status as TradeStatus,
      book: new Book({ ...updated.Book, user: updated.Book.usersId }),
    });
  }
}
