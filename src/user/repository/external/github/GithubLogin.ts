import axios from 'axios';
import { ExternalRepository } from '../../../../common/ExternalRepository';
import environment from '../../../../config/environment';

interface IAccessTokenResponse {
  access_token: string;
}

export class GithubLogin extends ExternalRepository {
  async execute(code: string, clientId: string, clientSecret: string) {
    const response = await this.dispatchRequest<IAccessTokenResponse>(
      'POST',
      'https://github.com/login/oauth/access_token',
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return response;
  }
}
