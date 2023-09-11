import { Test, TestingModule } from '@nestjs/testing';

import { Tokens } from '@/books/settings/tokens';

import { UploadBookCoverController } from './upload-book-cover.controller';
import { UploadBookCoverUseCase } from '@/books/use-cases/books/upload-book-cover/upload-book-cover.interface';
import { NotFoundError } from '@/books/domain/errors';

describe('UploadBookCoverController', () => {
  let controller: UploadBookCoverController;
  let useCase: UploadBookCoverUseCase;

  let fileParams: Express.Multer.File;
  let bookId: string;
  let request: { user: { id: 'user_id' } };

  let result: UploadBookCoverUseCase.Result;

  beforeEach(async () => {
    result = {
      id: 'book_id',
      author: 'author',
      description: 'description',
      image: 'image',
      publisher: 'publisher',
      title: 'title',
      year: 2021,
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UploadBookCoverController],
      providers: [
        {
          provide: Tokens.UploadBookCoverUseCase,
          useValue: {
            upload: jest.fn().mockResolvedValue(result),
          },
        },
      ],
    }).compile();

    controller = app.get<UploadBookCoverController>(UploadBookCoverController);
    useCase = app.get<UploadBookCoverUseCase>(Tokens.UploadBookCoverUseCase);

    fileParams = {
      buffer: Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
      mimetype: 'image/jpeg',
    } as any;

    bookId = 'book_id';

    request = { user: { id: 'user_id' } };
  });

  it('should call the UploadBookCoverUseCase.upload with correct params', async () => {
    await controller.upload(fileParams, bookId, request);

    const expected = {
      userId: request.user.id,
      bookId,
      file: fileParams.buffer,
      mimetype: fileParams.mimetype,
    };

    expect(useCase.upload).toHaveBeenCalledWith(expected);
  });

  it('should throw NotFoundException if UploadBookCoverUseCase.upload throws NotFoundError', async () => {
    (useCase.upload as jest.Mock).mockRejectedValueOnce(new NotFoundError('Book not found'));

    await expect(controller.upload(fileParams, bookId, request)).rejects.toThrowError('Book not found');
  });

  it('should throw the error if UploadBookCoverUseCase.upload throws an error', async () => {
    (useCase.upload as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    await expect(controller.upload(fileParams, bookId, request)).rejects.toThrowError('Error');
  });

  it('should return the book', async () => {
    const got = await controller.upload(fileParams, bookId, request);

    expect(got).toEqual(result);
  });
});
