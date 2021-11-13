import express from 'express';
import { authorize } from '../server/middleware/authorize';
import { UserController } from './user.controller';

const userController = new UserController();
const router = express.Router();

router.get('/login/github', userController.loginGithub());
router.get(
  '/profile',
  authorize('admin', 'user'),
  userController.profileUser()
);
router.post('/authenticate', userController.authenticate());

export default router;
