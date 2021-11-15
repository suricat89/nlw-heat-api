import { RequestHandler } from 'express';
import { IRouteSchema } from '../../../types';
import { BadRequest } from '../errors';

export function validateInput(routeSchemas: IRouteSchema[]): RequestHandler {
  return async (req, res, next) => {
    for (let { schema, source } of routeSchemas) {
      try {
        await schema.validateAsync(req[source], { abortEarly: false });
      } catch (error) {
        throw new BadRequest(error);
      }
    }
    return next();
  };
}
