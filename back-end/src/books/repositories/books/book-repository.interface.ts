import { Book } from '@/books/domain/entities';

export interface BookRepository {
  search(params: SearchParams): Promise<SearchResponse>;
  create(book: Book): Promise<Book>;
  getById(params: GetByIdParams): Promise<Book | undefined>;
}

export type GetByIdParams = {
  userId?: string;
  id: string;
};

export type SearchParams = {
  q: string;
  page: number;
  limit: number;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export type SearchResponse = {
  pagination: Pagination;
  books: Book[];
};
