import joi from 'joi';
import { IRouteSchema } from '../../types';

export const createMessageSchema: IRouteSchema[] = [
  {
    source: 'body',
    schema: joi.object({
      message: joi
        .object({
          text: joi.string().required(),
        })
        .required(),
    }),
  },
];

export const getLastMessagesSchema: IRouteSchema[] = [
  {
    source: 'query',
    schema: joi.object({
      ammountMessages: joi.number().optional(),
    }),
  },
];
