import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/services';
import { User } from '@/users/domain/entitites';

import { UserRepository } from './user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUsername(username: string): Promise<User> {
    const user = await this.prismaService.users.findUnique({ where: { username } });
    return user;
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prismaService.users.create({ data: user });
    return new User(createdUser);
  }
}
