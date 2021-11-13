import { CreateMessage } from '../repository/internal/CreateMessage';
import { io } from '../../server/app';
import { Service } from '../../common/Service';
import { IDatabaseMessage } from '../../../types';

export class CreateMessageService extends Service<IDatabaseMessage> {
  async execute(text: string, userId: string) {
    const databaseMessage = await new CreateMessage().execute(text, userId);

    io.emit('new_message', databaseMessage);
    return this.envelope(databaseMessage);
  }
}
