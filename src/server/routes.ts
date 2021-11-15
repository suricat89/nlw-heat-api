import express from 'express';

import userRouter from '../user/user.routes';
import messageRouter from '../message/message.routes';
import healthcheckRouter from '../healthcheck/healthcheck.routes';

const router = express.Router();

router.use('/user', userRouter);
router.use('/message', messageRouter);
router.use('/', healthcheckRouter);

export default router;
