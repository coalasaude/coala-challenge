import { BadRequestException, Controller, Get, Inject, Req } from '@nestjs/common';

import * as MeDTO from './me.dto';
import { Tokens } from '@/users/settings/tokens';
import { FindUserUseCase } from '@/users/use-cases';

@Controller('/users')
export class MeController {
  constructor(@Inject(Tokens.FindUserUseCase) private readonly findUserUseCase: FindUserUseCase) {}

  @Get('/me')
  async getMe(@Req() request): Promise<MeDTO.Response> {
    try {
      const user = await this.findUserUseCase.findByUsername({ username: request.user.username });
      return {
        id: user.id,
        name: user.name,
        username: user.username,
      };
    } catch (error) {
      if (error.name === 'UserAlreadyExistsError') throw new BadRequestException('User already exists');
      throw error;
    }
  }
}
