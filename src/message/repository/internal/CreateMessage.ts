import { prismaClient } from '../../../config/database';

export class CreateMessage {
  execute(text: string, userId: string) {
    return prismaClient.message.create({
      data: {
        text,
        user_id: userId,
      },
      include: {
        user: true,
      },
    });
  }
}
