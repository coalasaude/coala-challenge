import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { FindUserUseCase } from '@/users/use-cases';
import { Tokens } from '@/users/settings/tokens';
import { Tokens as CommonTokens } from '@/common/settings/tokens';
import { Encrypter } from '@/common/encrypter';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Tokens.FindUserUseCase) private findUserService: FindUserUseCase,
    @Inject(CommonTokens.Encrypter) private encrypter: Encrypter,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.findUserService.findByUsername({ username });

    if (user && this.encrypter.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: { username: string; id: string }) {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
