import { TradeStatus } from '@/books/domain/types';

export interface UpdateTradeService {
  update(params: UpdateTradeService.Params): Promise<UpdateTradeService.Response>;
}

export namespace UpdateTradeService {
  export type Params = {
    userId: string;
    id: string;
    status: TradeStatus;
  };

  export type Response = {
    id: string;
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
