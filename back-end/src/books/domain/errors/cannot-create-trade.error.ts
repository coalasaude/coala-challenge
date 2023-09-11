export class CannotCreateTradeError extends Error {
  constructor() {
    super('Cannot create trade');
    this.name = 'CannotCreateTradeError';
  }
}
