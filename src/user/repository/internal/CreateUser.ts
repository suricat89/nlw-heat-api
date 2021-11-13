import prismaClient from '../../../config/database';
import { IGetUserResponse } from '../external/github/GetUserData';

export enum Profile {
  user = 'user',
  admin = 'admin',
}

export class CreateUser {
  async execute(user: IGetUserResponse, profile: Profile) {
    return prismaClient.user.create({
      data: {
        github_id: user.id,
        login: user.login,
        avatar_url: user.avatar_url,
        name: user.name,
        profile,
      },
    });
  }
}
