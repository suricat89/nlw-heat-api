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
  loginGithub(): express.RequestHandler {
    return async (req, res, next) => {
      let params = `client_id=${environment.authentication.github.id}`;
      res.redirect(`https://github.com/login/oauth/authorize?${params}`);
    };
  }

  profileUser(): express.RequestHandler {
    return async (req, res, next) => {
      const { id } = req.authenticated.user;

      const result = await new ProfileUserService().execute(id);
      return this.renderResponse<User>(res)(result);
    };
  }

  authenticate(): express.RequestHandler {
    return async (req, res, next) => {
      const { code } = req.body;

      const service = new AuthenticateUserService();
      const result = await service.execute(code);

      return this.renderResponse<IAuthResponse>(res)(result);
    };
  }
}
