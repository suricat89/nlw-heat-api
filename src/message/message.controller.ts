import { RequestHandler } from 'express';
import { IDatabaseMessage } from '../../types';
import { Controller } from '../common/Controller';
import environment from '../config/environment';
import { CreateMessageService } from './services/CreateMessageService';
import { GetLastMessagesService } from './services/GetLastMessagesService';

export class MessageController extends Controller {
  createMessage(): RequestHandler {
    return async (req, res, next) => {
      const { text } = req.body.message;
      const { id } = req.authenticated.user;

      const result = await new CreateMessageService().execute(text, id);

      return this.renderResponse<IDatabaseMessage>(res)(result);
    };
  }

  getLastMessages(): RequestHandler {
    return async (req, res, next) => {
      let ammountGetMessages =
        Number.parseInt(req.query.ammountMessages as string) ||
        environment.messages.ammountGetMessages;

      const result = await new GetLastMessagesService().execute(
        ammountGetMessages
      );

      return this.renderResponse<IDatabaseMessage>(res)(result);
    };
  }
}
