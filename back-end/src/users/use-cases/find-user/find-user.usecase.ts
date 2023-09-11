import { Inject, Injectable } from '@nestjs/common';

import { Tokens } from '@/users/settings/tokens';
import { UserNotFoundError } from '@/users/domain/errors';
import { UserRepository } from '@/users/repositories/users';

import { FindUserUseCase } from './find-user.inferface';

@Injectable()
export class FindUserUseCaseImpl implements FindUserUseCase {
  constructor(@Inject(Tokens.UserRepository) private readonly userRepository: UserRepository) {}

  async findByUsername(params: FindUserUseCase.Params): Promise<FindUserUseCase.Response> {
    const user = await this.userRepository.findByUsername(params.username);

    if (!user) throw new UserNotFoundError();

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      password: user.password,
    };
  }
}
