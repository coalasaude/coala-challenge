export class Tokens {
  static readonly BookRepository = Symbol.for('BookRepository');
  static readonly TradeRepository = Symbol.for('TradeRepository');

  static readonly CreateTradeService = Symbol.for('CreateTradeService');
  static readonly UpdateTradeService = Symbol.for('UpdateTradeService');

  static readonly CreateBookService = Symbol.for('CreateBookService');
  static readonly GetBookByIdService = Symbol.for('GetBookByIdService');
}
