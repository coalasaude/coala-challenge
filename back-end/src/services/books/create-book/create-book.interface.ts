export interface CreateBook {
  create(params: CreateBook.Params): Promise<CreateBook.Response>;
}

export namespace CreateBook {
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
