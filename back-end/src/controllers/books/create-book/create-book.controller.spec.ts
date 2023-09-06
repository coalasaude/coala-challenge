import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookController } from './create-book.controller';
import { CreateBookService } from '../../../services/books/create-book';

describe('CreateBookController', () => {
  let createBookController: CreateBookController;
  let createBookService: CreateBookService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CreateBookController],
      providers: [CreateBookService],
    }).compile();

    createBookController = app.get<CreateBookController>(CreateBookController);
    createBookService = app.get<CreateBookService>(CreateBookService);
  });

  describe('/books', () => {
    it('should return the book on created', () => {
      const expected = {
        id: '1',
        title: 'Book title',
        description: 'Book description',
        image: 'Book image',
      };

      expect(createBookController.create()).toEqual(expected);
    });

    it('should call the createBookService', () => {
      const spy = jest.spyOn(createBookService, 'create');

      createBookController.create();

      expect(spy).toHaveBeenCalled();
    });
  });
});
