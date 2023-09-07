export interface FindUserService {
  findByUsername(params: FindUserService.Params): Promise<FindUserService.Response>;
}

export namespace FindUserService {
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
