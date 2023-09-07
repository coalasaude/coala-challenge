import { Injectable } from '@nestjs/common';

import { Trade } from '@/domain/entities';
import { TradeStatus } from '@/domain/types';

import { PrismaService } from '../prisma.service';
import { TradeRepository } from './trade-repository.interface';

@Injectable()
export class PrismaTradeRepository implements TradeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(trade: Trade): Promise<Trade> {
    const created = await this.prismaService.trades.create({
      data: {
        id: trade.id,
        message: trade.message,
        status: trade.status,
        bookId: trade.book.id,
      },
    });

    return new Trade({
      id: created.id,
      message: created.message,
      status: created.status as TradeStatus,
      book: trade.book,
    });
  }
}
