import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import environment from '../../config/environment';
import { IJwtTokenPayload } from '../../user/services/AuthenticateUserService';
import { Forbidden, Unauthorized } from '../errors';

export const authorize = (...permissions: string[]): RequestHandler => {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Unauthorized('Please provide an Authorization header');
    }

    try {
      const decodedToken = decodeToken(authorization as string);
      const hasPermission = decodedToken.user.permissions.some(
        (tokenPermission) =>
          permissions.some(
            (p) => p.toLowerCase() === tokenPermission.toLowerCase()
          )
      );

      if (!hasPermission) {
        throw new Forbidden('You are not allowed to access this resource');
      }

      req.authenticated = decodedToken;
      return next();
    } catch (error) {
      throw new Unauthorized('Invalid Authorization header');
    }
  };
};

const decodeToken = (bearerToken: string) => {
  const [, token] = bearerToken.split(' ');
  const decoded = jwt.verify(token, environment.jwt.secret);
  return decoded as IJwtTokenPayload;
};
