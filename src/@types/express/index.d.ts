declare namespace Express {
  export interface Request {
    authenticated: import('../../user/services/AuthenticateUserService').IJwtTokenPayload;
  }
}
