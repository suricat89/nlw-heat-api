import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.code).json({
      error: err.message,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: err.message || 'Internal Server Error',
  });
};
