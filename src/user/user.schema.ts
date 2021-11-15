import joi from 'joi';
import { IRouteSchema } from '../../types';

export const authenticateUserSchema: IRouteSchema[] = [
  {
    source: 'body',
    schema: joi.object({
      code: joi.string().required(),
      source: joi.string().lowercase().valid('web', 'mobile').required(),
    }),
  },
];
