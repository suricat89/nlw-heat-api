import express from 'express';
import { authorize } from '../server/middleware/authorize';
import { MessageController } from './message.controller';

const messageController = new MessageController();
const router = express.Router();

router.post('/', authorize('admin', 'user'), messageController.createMessage());
router.get('/last', messageController.getLastMessages());

export default router;
