import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { Tokens } from '@/users/settings/tokens';
import { Tokens as CommonTokens } from '@/common/settings/tokens';

import { FindUserUseCase } from '@/users/use-cases';
import { Encrypter } from '@/common/encrypter';

import { ValidateUserUseCaseImpl } from './validate-user.usecase';
import { ValidateUserUseCase } from './validate-user.interface';

describe('ValidateUserUseCase', () => {
  let sut: ValidateUserUseCase;

  let findUserUseCase: FindUserUseCase;
  let encrypter: Encrypter;

  let params: ValidateUserUseCase.Params;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateUserUseCaseImpl,
        {
          provide: CommonTokens.Encrypter,
          useValue: {
            compare: jest.fn().mockReturnValue(true),
          },
        },
        {
          provide: Tokens.FindUserUseCase,
          useValue: {
            findByUsername: jest.fn().mockResolvedValue({
              id: faker.string.uuid(),
              name: faker.person.fullName(),
              username: faker.internet.userName(),
              password: faker.internet.password(),
            }),
          },
        },
      ],
    }).compile();

    sut = module.get<ValidateUserUseCase>(ValidateUserUseCaseImpl);
    encrypter = module.get<Encrypter>(CommonTokens.Encrypter);
    findUserUseCase = module.get<FindUserUseCase>(Tokens.FindUserUseCase);

    params = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
  });

  it('should call FindUserUseCase.findByUsername with the correct params', async () => {
    await sut.validateUser(params);

    expect(findUserUseCase.findByUsername).toHaveBeenCalledWith({ username: params.username });
  });

  it('should call Encrypter.compare with the correct params', async () => {
    await sut.validateUser(params);

    expect(encrypter.compare).toHaveBeenCalledWith(params.password, expect.any(String));
  });

  it('should return null if the user is not found', async () => {
    jest.spyOn(findUserUseCase, 'findByUsername').mockResolvedValue(null);

    const got = await sut.validateUser(params);

    expect(got).toBeNull();
  });

  it('should return null if the password is invalid', async () => {
    jest.spyOn(encrypter, 'compare').mockResolvedValueOnce(false);

    const got = await sut.validateUser(params);

    expect(got).toBeNull();
  });

  it('should return the user without the password', async () => {
    const got = await sut.validateUser(params);

    const expected = {
      id: expect.any(String),
      name: expect.any(String),
      username: expect.any(String),
    };

    expect(got).toEqual(expected);
  });
});
