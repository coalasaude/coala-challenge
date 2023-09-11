import { Controller, Request, Post, UseGuards, Inject } from '@nestjs/common';

import { LoginUseCase } from '@/auth/use-cases';
import { LocalAuthGuard } from '@/auth/guards';
import { Public } from '@/auth/decorators';

import { Tokens } from '../settings/tokens';

@Controller('/auth')
export class AuthController {
  constructor(@Inject(Tokens.LoginUseCase) private readonly authService: LoginUseCase) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async signin(@Request() req) {
    return this.authService.login(req.user);
  }
}
