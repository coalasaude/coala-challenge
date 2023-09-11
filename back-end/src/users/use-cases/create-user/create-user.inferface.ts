export interface CreateUserUseCase {
  create(params: CreateUserUseCase.Params): Promise<CreateUserUseCase.Response>;
}

export namespace CreateUserUseCase {
  export type Params = {
    name: string;
    username: string;
    password: string;
  };

  export type Response = {
    id: string;
    name: string;
    username: string;
  };
}
