export class Tokens {
  static readonly UserRepository = Symbol.for('UserRepository');

  static readonly CreateUserUseCase = Symbol.for('CreateUserUseCase');
  static readonly FindUserUseCase = Symbol.for('FindUserUseCase');
}
