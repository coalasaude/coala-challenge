export interface CreateBookUseCase {
  create(params: CreateBookUseCase.Params): Promise<CreateBookUseCase.Response>;
}

export namespace CreateBookUseCase {
  export type Params = {
    title: string;
    publisher: string;
    author: string;
    year: number;
    description: string;
    user: string;
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
