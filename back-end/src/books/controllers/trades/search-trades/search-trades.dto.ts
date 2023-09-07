import { TradeStatus } from '@/books/domain/types';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

enum Scope {
  REQUESTER = 'requester',
  OWNER = 'owner',
}

export class SearchParams {
  @IsOptional()
  @IsEnum(Scope)
  scope: 'requester' | 'owner';

  @IsOptional()
  @IsEnum(TradeStatus)
  status: TradeStatus;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value) ?? 1)
  page: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value) ?? 10)
  limit: number;
}

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

export class Response {
  pagination: Pagination;
  trades: Trade[];
}
