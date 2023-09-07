import * as Crypto from 'crypto';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Tokens } from '@/settings/tokens';
import { NotFoundError } from '@/domain/errors';
import { Book } from '@/domain/entities';
import { GetBookByIdService } from '@/services/books/get-book-by-id';

import { GetBookByIdController } from './get-book-by-id.controller';

describe('CreateBookController', () => {
  let getBookByIdController: GetBookByIdController;
  let getBookByIdService: GetBookByIdService;

  let params: string;
  let book: Book;

  beforeEach(async () => {
    book = new Book({
      id: faker.string.uuid(),
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      publisher: faker.company.name(),
      year: faker.number.int({ min: 1900, max: 2023 }),
    });

    const app: TestingModule = await Test.createTestingModule({
      controllers: [GetBookByIdController],
      providers: [
        {
          provide: Tokens.GetBookByIdService,
          useValue: { getById: jest.fn().mockResolvedValue(book) },
        },
      ],
    }).compile();

    getBookByIdController = app.get<GetBookByIdController>(GetBookByIdController);
    getBookByIdService = app.get<GetBookByIdService>(Tokens.GetBookByIdService);

    params = Crypto.randomUUID();
  });

  describe('/books', () => {
    it('should call the createBookService', async () => {
      await getBookByIdController.create(params);
      expect(getBookByIdService.getById).toHaveBeenCalled();
    });

    it('should return not found exception', async () => {
      jest.spyOn(getBookByIdService, 'getById').mockRejectedValue(new NotFoundError('Book not found'));

      const expected = new NotFoundException();

      await expect(getBookByIdController.create(params)).rejects.toEqual(expected);
    });

    it('should throw an error if the service throws', async () => {
      jest.spyOn(getBookByIdService, 'getById').mockRejectedValue(new Error('Internal server error'));

      const expected = new Error('Internal server error');

      await expect(getBookByIdController.create(params)).rejects.toEqual(expected);
    });

    it('should return the book on created', async () => {
      const got = await getBookByIdController.create(params);

      const expected = book;

      expect(got).toEqual(expected);
    });
  });
});
