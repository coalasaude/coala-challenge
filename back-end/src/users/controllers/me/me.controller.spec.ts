import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { FindUserUseCase } from '@/users/use-cases';
import { Tokens } from '@/users/settings/tokens';

import { MeController } from './me.controller';
import { UserAlreadyExistsError } from '@/users/domain/errors';

describe('CreateBookController', () => {
  let controller: MeController;
  let useCase: FindUserUseCase;

  let params: { user: { username: string } };
  let useCaseResponse: FindUserUseCase.Response;

  beforeEach(async () => {
    params = { user: { username: faker.internet.userName() } };

    useCaseResponse = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      username: params.user.username,
      password: faker.internet.password(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [MeController],
      providers: [
        {
          provide: Tokens.FindUserUseCase,
          useValue: {
            findByUsername: jest.fn().mockResolvedValue(useCaseResponse),
          },
        },
      ],
    }).compile();

    controller = app.get<MeController>(MeController);
    useCase = app.get<FindUserUseCase>(Tokens.FindUserUseCase);
  });

  it('should call the FindUserUseCase.findByUsername with correct params', async () => {
    await controller.getMe(params);

    expect(useCase.findByUsername).toHaveBeenCalledWith(params.user);
  });

  it('should return BadRequestException if FindUserUseCase.findByUsername throws UserAlreadyExistsError', async () => {
    (useCase.findByUsername as jest.Mock).mockRejectedValueOnce(new UserAlreadyExistsError());

    await expect(controller.getMe(params)).rejects.toThrow('User already exists');
  });

  it('should throw the error if FindUserUseCase.findByUsername throws an error', async () => {
    const error = new Error('random error');
    (useCase.findByUsername as jest.Mock).mockRejectedValueOnce(error);

    await expect(controller.getMe(params)).rejects.toThrow(error);
  });

  it('should return the user if FindUserUseCase.findByUsername returns a user', async () => {
    const response = await controller.getMe(params);

    expect(response).toEqual({
      id: useCaseResponse.id,
      name: useCaseResponse.name,
      username: useCaseResponse.username,
    });
  });
});
