import { Inject, Injectable } from '@nestjs/common';

import { Tokens } from '@/users/settings/tokens';

import { UserNotFoundError } from '@/users/domain/errors';

import { Encrypter } from '@/common/encrypter';
import { UserRepository } from '@/users/repositories/users';

import { FindUserService } from './find-user.inferface';

@Injectable()
export class FindUserServiceImpl implements FindUserService {
  constructor(@Inject(Tokens.UserRepository) private readonly userRepository: UserRepository) {}

  async findByUsername(params: FindUserService.Params): Promise<FindUserService.Response> {
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
