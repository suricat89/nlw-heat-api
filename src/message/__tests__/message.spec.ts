import { agent } from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { _initApp, _initSocket } from '../../server/app';
import { getTestData, ITestData } from '../../../jest/global';
import { messageData } from '../__data__/message.data';
import { messageInterceptors } from '../__interceptors__/message.interceptor';
import environment from '../../config/environment';

let app: Express.Application;

let testData: ITestData;
beforeAll(async () => {
  app = await _initApp();
  testData = await getTestData();
  _initSocket(app);

  environment.authentication.github = {
    mobile: {
      clientId: 'aaa',
      clientSecret: 'aaa'
    },
    web: {
      clientId: 'aaa',
      clientSecret: 'aaa'
    }
  };
});

describe('GET /message/last', () => {
  const responseData = messageData.getLast.response;

  describe('Success scenarios', () => {
    it(`[SGML001] [HTTP 200] should get last 3 messages if no
    ammountMessages is provided and default is 3`, async () => {
      environment.messages.ammountGetMessages = 3;
      const response = await agent(app).get('/message/last');

      const expectedResponseBody = responseData.success.last3Messages;
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject(expectedResponseBody);
      expect(response.body.records).toHaveLength(3);
    });

    it(`[SGML002] [HTTP 200] should get a single message if the 
    ammountMessages is set to 1`, async () => {
      const response = await agent(app).get('/message/last').query({
        ammountMessages: 1
      });

      const expectedResponseBody = responseData.success.singleMessage;
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject(expectedResponseBody);
      expect(response.body.records).toHaveLength(1);
    });
  });
});

describe('POST /message', () => {
  const requestData = messageData.postMessage.request;
  const responseData = messageData.postMessage.response;

  describe('Success scenarios', () => {
    it(`[SPM001] [HTTP 200] should create a new message`, async () => {
      messageInterceptors.SPM001();
      const response = await agent(app)
        .post('/message')
        .set('Authorization', testData.nonAdminToken)
        .send(requestData.SPM001);

      const expectedResponseBody = responseData.success.SPM001;
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject(expectedResponseBody);
    });
  });

  describe('Error scenarios', () => {
    it(`[EPM001] [HTTP 500] should return an error if the user
        does not exist`, async () => {
      messageInterceptors.EPM001();
      const response = await agent(app)
        .post('/message')
        .set('Authorization', testData.nonExistingUserToken)
        .send(requestData.EPM001);

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
