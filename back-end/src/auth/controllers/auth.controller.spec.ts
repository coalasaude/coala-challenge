import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Tokens } from '../settings/tokens';
import { LoginUseCase } from '../use-cases';

describe('AuthController', () => {
  let controller: AuthController;

  let loginUseCase: LoginUseCase;

  let params: { user: { username: string; id: string } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: Tokens.LoginUseCase,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: 'token' }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    loginUseCase = module.get<LoginUseCase>(Tokens.LoginUseCase);

    params = {
      user: {
        id: 'id',
        username: 'username',
      },
    };
  });

  it('should call LoginUseCase.login with the correct params', async () => {
    await controller.signin(params);

    expect(loginUseCase.login).toHaveBeenCalledWith(params.user);
  });
});
