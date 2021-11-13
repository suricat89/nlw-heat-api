import { Service } from '../../common/Service';
import prismaClient from '../../config/database';
import { IDatabaseMessage } from '../../../types';

export class GetLastMessagesService extends Service<IDatabaseMessage> {
  async execute(ammountMsg: number) {
    const messages = await prismaClient.message.findMany({
      take: ammountMsg,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true,
      },
    });

    return this.envelope(messages);
  }
}
