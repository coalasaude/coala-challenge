export interface SearchBooksUseCase {
  search(params: SearchBooksUseCase.Params): Promise<SearchBooksUseCase.Response>;
}

export namespace SearchBooksUseCase {
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
