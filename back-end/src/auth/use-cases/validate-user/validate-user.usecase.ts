import { Inject, Injectable } from '@nestjs/common';

import { Tokens } from '@/users/settings/tokens';
import { Tokens as CommonTokens } from '@/common/settings/tokens';

import { ValidateUserUseCase } from './validate-user.interface';
import { FindUserUseCase } from '@/users/use-cases';
import { Encrypter } from '@/common/encrypter';

@Injectable()
export class ValidateUserUseCaseImpl implements ValidateUserUseCase {
  constructor(
    @Inject(Tokens.FindUserUseCase) private findUserService: FindUserUseCase,
    @Inject(CommonTokens.Encrypter) private encrypter: Encrypter,
  ) {}

  async validateUser({ username, password }: ValidateUserUseCase.Params): Promise<ValidateUserUseCase.Result> {
    const user = await this.findUserService.findByUsername({ username });

    if (user && (await this.encrypter.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
