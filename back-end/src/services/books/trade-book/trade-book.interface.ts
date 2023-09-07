import { TradeStatus } from '@/domain/types';

export interface TradeBook {
  trade(params: TradeBook.Params): Promise<TradeBook.Response>;
}

export namespace TradeBook {
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
