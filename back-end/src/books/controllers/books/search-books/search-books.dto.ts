import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchParams {
  @IsString()
  @IsOptional()
  q: string;

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

type Book = {
  id: string;
  title: string;
  image?: string;
};

export class Response {
  pagination: Pagination;
  books: Book[];
}
