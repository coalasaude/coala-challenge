import { TradeStatus } from '@/domain/types';

export interface UpdateTrade {
  update(params: UpdateTrade.Params): Promise<UpdateTrade.Response>;
}

export namespace UpdateTrade {
  export type Params = {
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
