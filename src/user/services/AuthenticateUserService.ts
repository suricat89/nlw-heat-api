import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '.prisma/client';
import { GetUserData } from '../repository/external/github/GetUserData';
import { GithubLogin } from '../repository/external/github/GithubLogin';
import { CreateUser, Profile } from '../repository/internal/CreateUser';
import { GetUserByGithubId } from '../repository/internal/GetUserByGithubId';
import environment from '../../config/environment';
import { Service } from '../../common/Service';
import { PreconditionFailed } from '../../server/errors';

export interface IJwtTokenPayload extends JwtPayload {
  user: {
    name: string;
    avatarUrl: string;
    id: string;
    permissions: string[];
  };
}

export interface IAuthResponse {
  token: string;
  user: User;
}

export enum AuthSource {
  WEB = 'web',
  MOBILE = 'mobile',
}

export class AuthenticateUserService extends Service<IAuthResponse> {
  async execute(code: string, source: AuthSource) {
    const { clientId, clientSecret } =
      environment.authentication.github[source];
    const githubToken = await new GithubLogin().execute(
      code,
      clientId,
      clientSecret
    );

    if (!githubToken.access_token) {
      throw new PreconditionFailed('Github auth error');
    }

    const userData = await new GetUserData().execute(githubToken.access_token);

    let databaseUser = await new GetUserByGithubId().execute(userData.id);
    if (!databaseUser) {
      databaseUser = await new CreateUser().execute(userData, Profile.user);
    }

    const token = this._generateToken(databaseUser);
    return this.envelope({
      token,
      user: databaseUser,
    });
  }

  _getPermissions(profile: Profile): string[] {
    const permissions = {
      admin: ['admin'],
      user: ['user'],
    };

    return permissions[profile];
  }

  _generateToken(databaseUser: User) {
    const permissions = this._getPermissions(databaseUser.profile as Profile);

    const jwtPayload: IJwtTokenPayload = {
      user: {
        name: databaseUser.name,
        avatarUrl: databaseUser.avatar_url,
        id: databaseUser.id,
        permissions,
      },
    };

    return jwt.sign(jwtPayload, environment.jwt.secret, {
      subject: databaseUser.id,
    });
  }
}
