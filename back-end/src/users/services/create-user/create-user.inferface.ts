export interface CreateUserService {
  create(params: CreateUserService.Params): Promise<CreateUserService.Response>;
}

export namespace CreateUserService {
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
