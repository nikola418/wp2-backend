import { HttpStatus } from '../enums';

export class Exception extends Error {
  status: HttpStatus;
  constructor(status: HttpStatus, message?: string) {
    if (message) super(message);
    else super(HttpStatus[status]);
    this.status = status;
  }
}
