import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';

import { AuthService } from '@/auth/services';
import { LocalAuthGuard } from '@/auth/guards';
import { Public } from '@/auth/decorators';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async signin(@Request() req) {
    return this.authService.login(req.user);
  }
}
