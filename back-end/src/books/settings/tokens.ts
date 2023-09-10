export class Tokens {
  static readonly BookRepository = Symbol.for('BookRepository');
  static readonly TradeRepository = Symbol.for('TradeRepository');

  static readonly Storage = Symbol.for('Storage');

  static readonly CreateTradeUseCase = Symbol.for('CreateTradeUseCase');
  static readonly UpdateTradeUseCase = Symbol.for('UpdateTradeUseCase');
  static readonly SearchTradesUseCase = Symbol.for('SearchTradesUseCase');

  static readonly CreateBookUseCase = Symbol.for('CreateBookUseCase');
  static readonly GetBookByIdUseCase = Symbol.for('GetBookByIdUseCase');
  static readonly SearchBooksUseCase = Symbol.for('SearchBooksUseCase');
  static readonly UploadBookCoverUseCase = Symbol.for('UploadBookCoverUseCase');
}
