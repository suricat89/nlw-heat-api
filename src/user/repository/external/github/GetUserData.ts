import { ExternalRepository } from '../../../../common/ExternalRepository';

export interface IGetUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

export class GetUserData extends ExternalRepository {
  async execute(accessToken: string) {
    const response = await this.dispatchRequest<IGetUserResponse>(
      'GET',
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }
}
