import { Test, TestingModule } from '@nestjs/testing';

import { Tokens } from '@/users/settings/tokens';
import { Tokens as CommonTokens } from '@/common/settings/tokens';
import { UserRepository } from '@/users/repositories';
import { Encrypter } from '@/common/encrypter';

import { CreateUserUseCaseImpl } from './create-user.usecase';
import { CreateUserUseCase } from './create-user.inferface';
import { faker } from '@faker-js/faker';
import { User } from '@/users/domain/entitites';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: jest.fn().mockReturnValue('randomUUID'),
}));

describe('UsersService', () => {
  let sut: CreateUserUseCaseImpl;

  let userRepository: UserRepository;
  let encrypter: Encrypter;

  let params: CreateUserUseCase.Params;
  let user: User;

  beforeEach(async () => {
    user = new User({
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCaseImpl,
        {
          provide: Tokens.UserRepository,
          useValue: {
            findByUsername: jest.fn(),
            create: jest.fn().mockResolvedValue(user),
          },
        },
        {
          provide: CommonTokens.Encrypter,
          useValue: {
            encrypt: jest.fn().mockResolvedValue(user.password),
          },
        },
      ],
    }).compile();

    sut = module.get<CreateUserUseCaseImpl>(CreateUserUseCaseImpl);

    userRepository = module.get<UserRepository>(Tokens.UserRepository);
    encrypter = module.get<Encrypter>(CommonTokens.Encrypter);

    params = {
      name: user.name,
      username: user.username,
      password: user.password,
    };
  });

  it('should call UserReporitory.findByUsername with correct params', async () => {
    const findByUsernameSpy = jest.spyOn(userRepository, 'findByUsername');

    await sut.create(params);

    expect(findByUsernameSpy).toHaveBeenCalledWith(params.username);
  });

  it('should return UserAlreadyExistsError if user already exists', async () => {
    jest.spyOn(userRepository, 'findByUsername').mockResolvedValueOnce({} as any);

    await expect(sut.create(params)).rejects.toThrowError('User already exists');
  });

  it('should call Encrypter.encrypt with correct params', async () => {
    const expected = params.password;

    await sut.create(params);

    expect(encrypter.encrypt).toHaveBeenCalledWith(expected);
  });

  it('should call UserRepository.create with correct params', async () => {
    await sut.create(params);

    expect(userRepository.create).toHaveBeenCalledWith(user);
  });

  it('should return correct response', async () => {
    const got = await sut.create(params);
    const expected = {
      id: user.id,
      name: user.name,
      username: user.username,
    };

    expect(got).toEqual(expected);
  });
});
