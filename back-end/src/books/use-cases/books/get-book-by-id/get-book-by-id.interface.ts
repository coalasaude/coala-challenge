export interface GetBookByIdUseCase {
  getById(params: GetBookByIdUseCase.Params): Promise<GetBookByIdUseCase.Response>;
}

export namespace GetBookByIdUseCase {
  export type Params = {
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
