import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@/users/users.module';
import { jwtConstants } from '@/auth/settings/constants';
import { JwtAuthGuard } from '@/auth/guards';
import { AuthController } from '@/auth/controllers';
import { LocalStrategy, JwtStrategy } from '@/auth/strategies';
import { CommonModule } from '@/common/common.module';

import { Tokens } from './settings/tokens';
import { NestJWTHandler } from './infrastructure/jwt-handler';
import { LoginUseCaseImpl, ValidateUserUseCaseImpl } from './use-cases';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: Tokens.JWTHandler,
      useClass: NestJWTHandler,
    },
    {
      provide: Tokens.LoginUseCase,
      useClass: LoginUseCaseImpl,
    },
    {
      provide: Tokens.ValidateUserUseCase,
      useClass: ValidateUserUseCaseImpl,
    },
  ],
  exports: [],
})
export class AuthModule {}
