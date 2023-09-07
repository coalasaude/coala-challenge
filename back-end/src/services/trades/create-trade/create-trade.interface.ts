import { TradeStatus } from '@/domain/types';

export interface CreateTrade {
  create(params: CreateTrade.Params): Promise<CreateTrade.Response>;
}

export namespace CreateTrade {
  export type Params = {
    bookId: string;
    message: string;
  };

  export type Response = {
    message: string;
    status: TradeStatus;
    book: {
      id: string;
      title: string;
      publisher: string;
      author: string;
      year: number;
      description: string;
      image: string;
    };
  };
}
