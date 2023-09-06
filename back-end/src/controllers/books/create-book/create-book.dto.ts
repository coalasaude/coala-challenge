import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export namespace CreateBookDTO {
  export class Request {
    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsString()
    publisher: string;

    @IsInt()
    year: number;

    @IsString()
    description: string;

    @IsUrl()
    @IsOptional()
    image?: string;
  }

  export class Response {
    id: string;
    title: string;
    publisher: string;
    year: number;
    description: string;
    image?: string;
  }
}
