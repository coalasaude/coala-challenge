import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { Tokens } from '@/auth/settings/tokens';
import { JWTHandler } from '@/auth/infrastructure/jwt-handler';

import { LoginUseCaseImpl } from './login.usecase';
import { LoginUseCase } from './login.interface';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: jest.fn().mockReturnValue('randomUUID'),
}));

describe('LoginUseCase', () => {
  let sut: LoginUseCaseImpl;

  let jwtHandler: JWTHandler;

  let params: LoginUseCase.Params;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCaseImpl,
        {
          provide: Tokens.JWTHandler,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    sut = module.get<LoginUseCaseImpl>(LoginUseCaseImpl);

    jwtHandler = module.get<JWTHandler>(Tokens.JWTHandler);

    params = {
      username: faker.internet.userName(),
      id: faker.string.uuid(),
    };
  });

  it('should call jwtHandler.sign with the correct params', async () => {
    await sut.login(params);

    expect(jwtHandler.sign).toHaveBeenCalledWith({ username: params.username, sub: params.id });
  });

  it('should return the access_token', async () => {
    const got = await sut.login(params);
    const expected = { access_token: 'token' };

    expect(got).toEqual(expected);
  });
});
