import { TradeStatus } from '@/books/domain/types';

export interface CreateTradeUseCase {
  create(params: CreateTradeUseCase.Params): Promise<CreateTradeUseCase.Response>;
}

export namespace CreateTradeUseCase {
  export type Params = {
    userId: string;
    bookId: string;
    message: string;
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
