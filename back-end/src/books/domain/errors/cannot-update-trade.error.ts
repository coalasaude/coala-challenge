export class CannotUpdateTradeError extends Error {
  constructor() {
    super('Cannot update trade');
    this.name = 'CannotUpdateTradeError';
  }
}
