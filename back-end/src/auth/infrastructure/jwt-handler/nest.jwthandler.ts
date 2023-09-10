import { Injectable } from '@nestjs/common';
import { JWTHandler } from './jwt-handler.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NestJWTHandler implements JWTHandler {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: any): string {
    return this.jwtService.sign(payload);
  }
}
