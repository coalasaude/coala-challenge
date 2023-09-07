export interface SearchBooksService {
  search(params: SearchBooksService.Params): Promise<SearchBooksService.Response>;
}

export namespace SearchBooksService {
  export type Params = {
    q: string;
    page: number;
    limit: number;
  };

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

  export type Response = {
    pagination: Pagination;
    books: Book[];
  };
}
