import * as bcrypt from 'bcrypt';
import { Encrypter } from './encrypter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptEncrypter implements Encrypter {
  private readonly SALT = 10;

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.SALT);
    return hash;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}
