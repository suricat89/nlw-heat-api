import express from 'express';
import { authorize } from '../server/middleware/authorize';
import { validateInput } from '../server/middleware/validateInput';
import { UserController } from './user.controller';
import { authenticateUserSchema } from './user.schema';

const userController = new UserController();
const router = express.Router();

router.get(
  '/profile',
  authorize('admin', 'user'),
  userController.profileUser()
);

router.post(
  '/authenticate',
  validateInput(authenticateUserSchema),
  userController.authenticate()
);

export default router;
