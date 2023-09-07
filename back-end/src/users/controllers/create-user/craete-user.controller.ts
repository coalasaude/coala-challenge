import { Public } from '@/auth/decorators';
import { BadRequestException, Body, Controller, Inject, Post } from '@nestjs/common';

import * as CreateUserDTO from './create-user.dto';
import { CreateUserService } from '@/users/services';
import { Tokens } from '@/users/settings/tokens';

@Controller('/users')
export class CreateUserController {
  constructor(@Inject(Tokens.CreateUserService) private readonly createUserService: CreateUserService) {}

  @Public()
  @Post()
  async create(@Body() body: CreateUserDTO.Request): Promise<CreateUserDTO.Response> {
    try {
      const user = await this.createUserService.create(body);
      return user;
    } catch (error) {
      if (error.name === 'UserAlreadyExistsError') throw new BadRequestException('User already exists');
      throw error;
    }
  }
}
