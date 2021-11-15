import express from 'express';
import { authorize } from '../server/middleware/authorize';
import { validateInput } from '../server/middleware/validateInput';
import { MessageController } from './message.controller';
import { createMessageSchema, getLastMessagesSchema } from './message.schema';

const messageController = new MessageController();
const router = express.Router();

router.post(
  '/',
  authorize('admin', 'user'),
  validateInput(createMessageSchema),
  messageController.createMessage()
);

router.get(
  '/last',
  validateInput(getLastMessagesSchema),
  messageController.getLastMessages()
);

export default router;
