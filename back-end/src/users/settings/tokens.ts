export class Tokens {
  static readonly UserRepository = Symbol.for('UserRepository');

  static readonly CreateUserService = Symbol.for('CreateUserService');
  static readonly FindUserService = Symbol.for('FindUserService');
}
