export namespace CreateBookDTO {
  export class Request {
    title: string;
    author: string;
    publisher: string;
    year: number;
    description: string;
    image?: string;
  }

  export class Response {
    id: string;
    title: string;
    publisher: string;
    year: number;
    description: string;
    image: string;
  }
}
