import { Trade } from '@/books/domain/entities';

export interface TradeRepository {
  create(trade: Trade): Promise<Trade>;
  findById(userId: string, id: string): Promise<Trade | null>;
  update(trade: Trade): Promise<Trade>;
}
