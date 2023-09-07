import { Trade } from '@/domain/entities';

export interface TradeRepository {
  create(trade: Trade): Promise<Trade>;
}
