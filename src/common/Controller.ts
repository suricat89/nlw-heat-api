import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IServiceEnvelope } from './Service';

export class Controller {
  renderResponse<T>(res: Response, statusCode = StatusCodes.OK) {
    return (data: IServiceEnvelope<T>) => {
      if (!data || !data.records || !data.records.length) {
        return res.status(StatusCodes.NO_CONTENT).json();
      }

      res.status(statusCode).json(data);
    };
  }
}
