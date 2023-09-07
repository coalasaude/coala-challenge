import { Trade } from '@/domain/entities';

export interface TradeRepository {
  create(trade: Trade): Promise<Trade>;
  findById(id: string): Promise<Trade | null>;
  update(trade: Trade): Promise<Trade>;
}
