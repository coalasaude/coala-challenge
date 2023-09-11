import { Test, TestingModule } from '@nestjs/testing';
import { FindUserUseCaseImpl } from './find-user.usecase';
import { UserRepository } from '@/users/repositories';
import { Tokens } from '@/users/settings/tokens';
import { User } from '@/users/domain/entitites';
import { faker } from '@faker-js/faker';

describe('FindUserUseCase', () => {
  let sut: FindUserUseCaseImpl;

  let userRepository: UserRepository;

  let user: User;

  beforeEach(async () => {
    user = new User({
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserUseCaseImpl,
        {
          provide: Tokens.UserRepository,
          useValue: {
            findByUsername: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    sut = module.get<FindUserUseCaseImpl>(FindUserUseCaseImpl);
    userRepository = module.get<UserRepository>(Tokens.UserRepository);
  });

  it('should call userRepository.findByUsername with correct params', async () => {
    await sut.findByUsername({ username: user.username });

    expect(userRepository.findByUsername).toHaveBeenCalledWith(user.username);
  });

  it('should throw UserNotFoundError if userRepository.findByUsername returns undefined', async () => {
    (userRepository.findByUsername as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(sut.findByUsername({ username: user.username })).rejects.toThrow('User not found');
  });

  it('should return user if userRepository.findByUsername returns a user', async () => {
    const got = await sut.findByUsername({ username: user.username });

    const expected = {
      id: user.id,
      name: user.name,
      username: user.username,
      password: user.password,
    };

    expect(got).toEqual(expected);
  });
});
