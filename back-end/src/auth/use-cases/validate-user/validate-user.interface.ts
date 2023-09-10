export interface ValidateUserUseCase {
  validateUser(params: ValidateUserUseCase.Params): Promise<ValidateUserUseCase.Result>;
}

export namespace ValidateUserUseCase {
  export type Params = {
    username: string;
    password: string;
  };

  export type Result = {
    id: string;
    name: string;
    username: string;
  };
}
