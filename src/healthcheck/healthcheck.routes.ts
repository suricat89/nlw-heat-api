import express from 'express';
import { HealthcheckController } from './healthcheck.controller';

const healthcheckController = new HealthcheckController();
const router = express.Router();

router.get('/ping', (req, res) => {
  res.send('pong');
});

router.get('/health', healthcheckController.appHealth());

export default router;
