import axios from 'axios';
import nock from 'nock';

export const externalRepositoryInterceptors = {
  UTSCER001(body: any) {
    nock('https://github.com').get('/test').reply(200, body);
  },
  UTSCER002(body: any) {
    nock('https://github.com').get('/test').reply(201, body);
  },
  UTECER001() {
    nock('https://github.com').get('/test').twice().reply(404);
  },
  UTECER002() {
    jest
      .spyOn(axios, 'request')
      .mockImplementationOnce(() => {
        throw new Error('Test error');
      })
      .mockImplementationOnce(() => {
        throw new Error('Test error');
      });
  }
};
