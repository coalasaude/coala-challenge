export interface GetBookById {
  getById(params: GetBookById.Params): Promise<GetBookById.Response>;
}

export namespace GetBookById {
  export type Params = { id: string };

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
