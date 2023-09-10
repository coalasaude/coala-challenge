export interface LoginUseCase {
  login(user: LoginUseCase.Params): Promise<LoginUseCase.Result>;
}

export namespace LoginUseCase {
  export type Params = {
    username: string;
    id: string;
  };

  export type Result = {
    access_token: string;
  };
}
