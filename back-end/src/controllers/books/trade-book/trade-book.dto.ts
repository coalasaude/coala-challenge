import { TradeStatus } from '@/domain/types';
import { IsString, MaxLength } from 'class-validator';

export class Request {
  @IsString()
  @MaxLength(255)
  message: string;
}

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
