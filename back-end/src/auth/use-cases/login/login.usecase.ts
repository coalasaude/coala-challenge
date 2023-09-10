import { Inject, Injectable } from '@nestjs/common';

import { Tokens } from '@/auth/settings/tokens';
import { JWTHandler } from '@/auth/infrastructure/jwt-handler';

import { LoginUseCase } from './login.interface';

@Injectable()
export class LoginUseCaseImpl implements LoginUseCase {
  constructor(@Inject(Tokens.JWTHandler) private readonly jwtHandler: JWTHandler) {}

  async login(user: LoginUseCase.Params): Promise<LoginUseCase.Result> {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtHandler.sign(payload) };
  }
}
