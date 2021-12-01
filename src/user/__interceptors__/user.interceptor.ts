import nock from 'nock';
import { User } from '.prisma/client';
import { IGetUserResponse } from '../repository/external/github/GetUserData';

function mapUserToGithub(user: User): IGetUserResponse {
  return {
    avatar_url: user.avatar_url,
    id: user.github_id,
    login: user.login,
    name: user.name
  };
}

function setGithubTokenInterceptor() {
  nock('https://github.com')
    .post('/login/oauth/access_token')
    .query(true)
    .reply(200, {
      access_token: '123456'
    });
}

function setGetGithubUserInterceptor(user: User) {
  nock('https://api.github.com').get('/user').reply(200, mapUserToGithub(user));
}

function setDefaultGithubInterceptors(user: User) {
  setGithubTokenInterceptor();
  setGetGithubUserInterceptor(user);
}

export const userInterceptors = {
  SPUA001: setDefaultGithubInterceptors,
  SPUA002: setDefaultGithubInterceptors,
  SPUA003: setDefaultGithubInterceptors,
  EPUA002() {
    nock('https://github.com')
      .post('/login/oauth/access_token')
      .query(true)
      .reply(204);
  },
  EPUA003() {
    nock('https://github.com')
      .post('/login/oauth/access_token')
      .query(true)
      .twice()
      .reply(404);
  }
};
