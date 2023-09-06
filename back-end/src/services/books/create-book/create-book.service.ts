import { Inject, Injectable } from '@nestjs/common';
import { CreateBook } from './create-book.interface';
import { Book } from '../../../domain/entities';
import { BookRepository } from 'src/repositories/book-repository.interface';

@Injectable()
export class CreateBookService implements CreateBook {
  constructor(@Inject('BookRepository') private readonly bookRepository: BookRepository) {}

  async create(params: CreateBook.Params): Promise<CreateBook.Response> {
    let book = new Book(params);
    book = await this.bookRepository.create(book);
    return book;
  }
}
