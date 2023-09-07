export interface GetBookByIdService {
  getById(params: GetBookByIdService.Params): Promise<GetBookByIdService.Response>;
}

export namespace GetBookByIdService {
  export type Params = {
    userId: string;
    id: string;
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
