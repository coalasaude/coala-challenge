import { Inject, Injectable } from '@nestjs/common';

import { Tokens } from '@/users/settings/tokens';
import { Tokens as CommonTokens } from '@/common/settings/tokens';

import { User } from '@/users/domain/entitites';
import { UserAlreadyExistsError } from '@/users/domain/errors';

import { Encrypter } from '@/common/encrypter';
import { UserRepository } from '@/users/repositories/users';

import { CreateUserService } from './create-user.inferface';

@Injectable()
export class CreateUserServiceImpl implements CreateUserService {
  constructor(
    @Inject(Tokens.UserRepository) private readonly userRepository: UserRepository,
    @Inject(CommonTokens.Encrypter) private readonly encrypter: Encrypter,
  ) {}

  async create(params: CreateUserService.Params): Promise<CreateUserService.Response> {
    const userExists = await this.userRepository.findByUsername(params.username);
    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    params.password = await this.encrypter.encrypt(params.password);

    let user = new User({ name: params.name, username: params.username, password: params.password });
    user = await this.userRepository.create(user);

    return {
      id: user.id,
      name: user.name,
      username: user.username,
    };
  }
}
