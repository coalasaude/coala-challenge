import { Test, TestingModule } from '@nestjs/testing';

import { CreateBook } from '@/services/books/create-book';

import { CreateBookController } from './create-book.controller';
import * as CreateBookDTO from './create-book.dto';
import { faker } from '@faker-js/faker';

describe('CreateBookController', () => {
  let createBookController: CreateBookController;
  let createBookService: CreateBook;

  let params: CreateBookDTO.Request;

  beforeEach(async () => {
    params = {
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      publisher: faker.company.name(),
      year: faker.number.int({ min: 1900, max: 2023 }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [CreateBookController],
      providers: [
        {
          provide: 'CreateBook',
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 'bc5c8e33-a815-4c77-9268-6363ee95529a',
              title: params.title,
              author: params.author,
              description: params.description,
              publisher: params.publisher,
              year: params.year,
              image: params.image,
            }),
          },
        },
      ],
    }).compile();

    createBookController = app.get<CreateBookController>(CreateBookController);
    createBookService = app.get<CreateBook>('CreateBook');
  });

  describe('/books', () => {
    it('should call the createBookService', async () => {
      const spy = jest.spyOn(createBookService, 'create');

      await createBookController.create(params);

      expect(spy).toHaveBeenCalled();
    });

    it('should return the book on created', async () => {
      const got = await createBookController.create(params);

      const expected = {
        id: 'bc5c8e33-a815-4c77-9268-6363ee95529a',
        title: params.title,
        author: params.author,
        description: params.description,
        publisher: params.publisher,
        year: params.year,
        image: params.image,
      };

      expect(got).toEqual(expected);
    });
  });
});
