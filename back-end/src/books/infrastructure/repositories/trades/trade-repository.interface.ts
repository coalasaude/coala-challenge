import { Trade } from '@/books/domain/entities';
import { TradeStatus } from '@/books/domain/types';

export interface TradeRepository {
  create(trade: Trade): Promise<Trade>;
  findById(params: TradeRepository.FindByIdParams): Promise<Trade | null>;
  update(trade: Trade): Promise<Trade>;
  search(params: TradeRepository.SearchParams): Promise<TradeRepository.SearchResponse>;
}

export namespace TradeRepository {
  export type FindByIdParams = {
    userId?: string;
    id: string;
  };

  export type SearchParams = {
    scope?: 'requester' | 'owner';
    status?: TradeStatus;
    userId?: string;
    page: number;
    limit: number;
  };

  type Pagination = {
    page: number;
    limit: number;
    total: number;
  };

  export type SearchResponse = {
    pagination: Pagination;
    trades: Trade[];
  };
}
