import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Tokens } from '../settings/tokens';
import { ValidateUserUseCase } from '../use-cases';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(Tokens.ValidateUserUseCase) private readonly validateUserUseCase: ValidateUserUseCase) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const user = await this.validateUserUseCase.validateUser({ username, password });
      if (!user) throw new UnauthorizedException();
      return user;
    } catch (error) {
      if (error.name === 'UserNotFoundError') throw new UnauthorizedException();

      throw error;
    }
  }
}
