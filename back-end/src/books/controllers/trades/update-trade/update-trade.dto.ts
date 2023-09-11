import { TradeStatus } from '@/books/domain/types';
import { IsEnum, IsString } from 'class-validator';

export class Request {
  @IsEnum(TradeStatus)
  status: TradeStatus;
}

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
