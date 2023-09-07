import { Trade } from '@/books/domain/entities';

export interface TradeRepository {
  create(trade: Trade): Promise<Trade>;
  findById(params: FindByIdParams): Promise<Trade | null>;
  update(trade: Trade): Promise<Trade>;
}

export type FindByIdParams = {
  userId?: string;
  id: string;
};
