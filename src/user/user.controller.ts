import { User } from '.prisma/client';
import express, { response } from 'express';
import { Controller } from '../common/Controller';
import environment from '../config/environment';
import {
  AuthenticateUserService,
  IAuthResponse,
} from './services/AuthenticateUserService';
import { ProfileUserService } from './services/ProfileUserService';

export class UserController extends Controller {
  profileUser(): express.RequestHandler {
    return async (req, res, next) => {
      const { id } = req.authenticated.user;

      const result = await new ProfileUserService().execute(id);
      return this.renderResponse<User>(res)(result);
    };
  }

  authenticate(): express.RequestHandler {
    return async (req, res, next) => {
      const { code, source } = req.body;

      const result = await new AuthenticateUserService().execute(code, source);
      return this.renderResponse<IAuthResponse>(res)(result);
    };
  }
}
