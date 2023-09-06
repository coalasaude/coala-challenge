import * as Crypto from 'crypto';

type BookConstructor = {
  id?: string;
  title: string;
  publisher: string;
  year: number;
  description: string;
  image?: string;
};

export class Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  description: string;
  image: string;

  constructor(params: BookConstructor) {
    this.id = params.id || Crypto.randomUUID();
    this.title = params.title;
    this.publisher = params.publisher;
    this.year = params.year;
    this.description = params.description;
    this.image = params.image;
  }
}
