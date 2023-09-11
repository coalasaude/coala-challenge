import { IsString, MinLength } from 'class-validator';

export class Request {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export type Response = {
  id: string;
  name: string;
  username: string;
};
