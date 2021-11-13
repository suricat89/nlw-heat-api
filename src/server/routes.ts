import express from 'express';

import userRouter from '../user/user.routes';
import messageRouter from '../message/message.routes';

const router = express.Router();

router.use('/user', userRouter);
router.use('/message', messageRouter);

export default router;
