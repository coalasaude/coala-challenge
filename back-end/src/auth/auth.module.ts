import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@/users/users.module';

import { jwtConstants } from '@/auth/settings/constants';
import { AuthService } from '@/auth/services';
import { JwtAuthGuard } from '@/auth/guards';
import { AuthController } from '@/auth/controllers';
import { LocalStrategy, JwtStrategy } from '@/auth/strategies';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
