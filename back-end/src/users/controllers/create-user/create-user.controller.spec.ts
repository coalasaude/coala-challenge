import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserUseCase } from '@/users/use-cases';
import { Tokens } from '@/users/settings/tokens';

import * as CreateUserDTO from './create-user.dto';
import { CreateUserController } from './craete-user.controller';
import { UserAlreadyExistsError } from '@/users/domain/errors';

describe('CreateBookController', () => {
  let controller: CreateUserController;
  let useCase: CreateUserUseCase;

  let params: CreateUserDTO.Request;
  let user: CreateUserUseCase.Response;

  beforeEach(async () => {
    params = {
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    user = { ...params, id: 'randomUUID' };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: Tokens.CreateUserUseCase,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: user.id,
              name: user.name,
              username: user.username,
            }),
          },
        },
      ],
    }).compile();

    controller = app.get<CreateUserController>(CreateUserController);
    useCase = app.get<CreateUserUseCase>(Tokens.CreateUserUseCase);
  });

  it('should call the CreateUserUseCase.create with correct params', async () => {
    await controller.create(params);

    expect(useCase.create).toHaveBeenCalledWith(params);
  });

  it('should throw BadRequestException if CreateUserUseCase.create throws UserAlreadyExistsError', async () => {
    (useCase.create as jest.Mock).mockRejectedValueOnce(new UserAlreadyExistsError());

    await expect(controller.create(params)).rejects.toThrow('User already exists');
  });

  it('should throw the error if CreateUserUseCase.create throws an error', async () => {
    const error = new Error('random error');

    (useCase.create as jest.Mock).mockRejectedValueOnce(error);

    await expect(controller.create(params)).rejects.toThrow(error);
  });

  it('should return the user on created', async () => {
    const got = await controller.create(params);

    const expected = {
      id: user.id,
      name: user.name,
      username: user.username,
    };

    expect(got).toEqual(expected);
  });
});
