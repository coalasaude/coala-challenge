import { TradeStatus } from '@/books/domain/types';

export interface SearchTradesUseCase {
  search(params: SearchTradesUseCase.Params): Promise<SearchTradesUseCase.Response>;
}

export namespace SearchTradesUseCase {
  export type Params = {
    scope?: 'requester' | 'owner';
    status?: TradeStatus;
    userId: string;
    page: number;
    limit: number;
  };

  type Pagination = {
    page: number;
    limit: number;
    total: number;
  };

  type Trade = {
    id: string;
    message: string;
    status: string;

    requester: {
      id: string;
      name: string;
      username: string;
    };

    book: {
      id: string;
      title: string;
      image?: string;
    };
  };

  export type Response = {
    pagination: Pagination;
    trades: Trade[];
  };
}
