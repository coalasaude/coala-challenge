import { Module } from '@nestjs/common';

import { Tokens } from '@/users/settings/tokens';

import { CreateUserUseCaseImpl, FindUserUseCaseImpl } from '@/users/use-cases';

import { CreateUserController } from '@/users/controllers';
import { CommonModule } from '@/common/common.module';
import { PrismaUserRepository } from '@/users/repositories';
import { MeController } from './controllers/me';

@Module({
  imports: [CommonModule],
  controllers: [CreateUserController, MeController],
  providers: [
    { provide: Tokens.CreateUserUseCase, useClass: CreateUserUseCaseImpl },
    { provide: Tokens.FindUserUseCase, useClass: FindUserUseCaseImpl },
    { provide: Tokens.UserRepository, useClass: PrismaUserRepository },
  ],
  exports: [Tokens.FindUserUseCase],
})
export class UsersModule {}
