import { Message, User } from '.prisma/client';
import { Schema } from 'joi';

export interface IDatabaseMessage extends Message {
  user: User;
}

export interface IRouteSchema {
  source: 'query' | 'body' | 'headers';
  schema: Schema;
}
