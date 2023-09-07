import * as Crypto from 'crypto';
import { TradeStatus } from '../types';
import { Book } from './book.entity';

type TradeConstructor = {
  id?: string;
  message: string;
  status?: TradeStatus;
  book: Book;
};

export class Trade {
  private _id: string;
  private _message: string;
  private _status: TradeStatus;
  private _book: Book;

  constructor(params: TradeConstructor) {
    this._id = params.id || Crypto.randomUUID();
    this._message = params.message;
    this._status = params.status || TradeStatus.PENDING;
    this._book = params.book;
  }

  get id(): string {
    return this._id;
  }

  get message(): string {
    return this._message;
  }

  set message(message: string) {
    this._status = TradeStatus.PENDING;
    this._message = message;
  }

  get status(): TradeStatus {
    return this._status;
  }

  set status(status: TradeStatus) {
    const isAcceptOrReject = status === TradeStatus.ACCEPTED || status === TradeStatus.REJECTED;
    const canUpdateStatus = isAcceptOrReject && this._status === TradeStatus.PENDING;

    if (canUpdateStatus) this._status = status;
  }

  get book(): Book {
    return this._book;
  }
}
