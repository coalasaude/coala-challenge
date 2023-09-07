export interface CreateBookService {
  create(params: CreateBookService.Params): Promise<CreateBookService.Response>;
}

export namespace CreateBookService {
  export type Params = {
    title: string;
    publisher: string;
    author: string;
    year: number;
    description: string;
    image?: string;
  };

  export type Response = {
    id: string;
    title: string;
    publisher: string;
    author: string;
    year: number;
    description: string;
    image: string;
  };
}
