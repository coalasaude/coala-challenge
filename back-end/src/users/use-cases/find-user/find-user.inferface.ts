export interface FindUserUseCase {
  findByUsername(params: FindUserUseCase.Params): Promise<FindUserUseCase.Response>;
}

export namespace FindUserUseCase {
  export type Params = {
    username: string;
  };

  export type Response = {
    id: string;
    name: string;
    username: string;
    password: string;
  };
}
