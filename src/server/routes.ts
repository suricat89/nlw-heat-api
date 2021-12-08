import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

import userRouter from '../user/user.routes';
import messageRouter from '../message/message.routes';
import healthcheckRouter from '../healthcheck/healthcheck.routes';

const router = express.Router();
const swaggerDocument = yaml.load('src/docs/swagger.yml');

router.use('/user', userRouter);
router.use('/message', messageRouter);
router.use('/', healthcheckRouter);

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

export default router;
