import { Module } from '@nestjs/common';
import { PrismaService } from './services';
import { Tokens } from './settings/tokens';
import { BcryptEncrypter } from './encrypter';

@Module({
  providers: [
    PrismaService,
    {
      provide: Tokens.Encrypter,
      useClass: BcryptEncrypter,
    },
  ],
  exports: [PrismaService, Tokens.Encrypter],
})
export class CommonModule {}
