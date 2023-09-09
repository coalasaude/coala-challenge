import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { Tokens } from '@/books/settings/tokens';
import { CreateBookUseCase } from '@/books/use-cases/books/create-book';

import { CreateBookController } from './create-book.controller';
import * as CreateBookDTO from './create-book.dto';

describe('CreateBookController', () => {
  let controller: CreateBookController;
  let useCase: CreateBookUseCase;

  let params: CreateBookDTO.Request;
  let request: { user: { id: string } };

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
          provide: Tokens.CreateBookUseCase,
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

    controller = app.get<CreateBookController>(CreateBookController);
    useCase = app.get<CreateBookUseCase>(Tokens.CreateBookUseCase);

    request = { user: { id: faker.string.uuid() } };
  });

  describe('/books', () => {
    it('should call the createBookService', async () => {
      await controller.create(request, params);

      expect(useCase.create).toHaveBeenCalledWith({ ...params, user: request.user.id });
    });

    it('should return the book on created', async () => {
      const got = await controller.create(request, params);

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
