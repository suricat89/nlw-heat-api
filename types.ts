import { Message, User } from '.prisma/client';

export interface IDatabaseMessage extends Message {
  user: User;
}
