import {StatusCodes} from 'http-status-codes';

export class HttpError extends Error{
  code: number;
  constructor(code: number, message?: string) {
    super(message);
    this.code = code;
  }
}

export class Forbidden extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.FORBIDDEN, message);
  }
}

export class NotFound extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class BadRequest extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export class Unauthorized extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export class Conflict extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.CONFLICT, message);
  }
}

export class NotAcceptable extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.NOT_ACCEPTABLE, message);
  }
}

export class PreconditionFailed extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.PRECONDITION_FAILED, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}