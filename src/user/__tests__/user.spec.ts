import { agent } from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { _initApp } from '../../server/app';
import { getTestData, ITestData } from '../../../jest/global';
import { userData } from '../__data__/user.data';
import { userInterceptors } from '../__interceptors__/user.interceptor';
import environment from '../../config/environment';

let app: Express.Application;
let testData: ITestData;

beforeAll(async () => {
  app = await _initApp();
  testData = await getTestData();

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

describe('GET /user/profile', () => {
  const responseData = userData.getProfile.response;

  describe('Success scenarios', () => {
    it('[SGUP001] [HTTP 200] should get admin user profile', async () => {
      const response = await agent(app)
        .get('/user/profile')
        .set('Authorization', testData.adminToken);

      const expectedResponseBody = responseData.success.admin(
        testData.adminUser.id
      );
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject(expectedResponseBody);
    });

    it('[SGUP002] [HTTP 200] should get non admin user profile', async () => {
      const response = await agent(app)
        .get('/user/profile')
        .set('Authorization', testData.nonAdminToken);

      const expectedResponseBody = responseData.success.nonAdmin(
        testData.nonAdminUser.id
      );
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject(expectedResponseBody);
    });

    it(`[SGUP003] [HTTP 204] should return nothing if user does 
        not exist on database`, async () => {
      const response = await agent(app)
        .get('/user/profile')
        .set('Authorization', testData.nonExistingUserToken);

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });
  });

  describe('Error scenarios', () => {
    it(`[EGUP001] [HTTP 401] should not allow an user to query
        profile without being authenticated`, async () => {
      const response = await agent(app).get('/user/profile');

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });

    it(`[EGUP002] [HTTP 401] should not allow an user to query
        profile with an invalid auth token`, async () => {
      const response = await agent(app)
        .get('/user/profile')
        .set('Authorization', 'Bearer 123456');

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });

    it(`[EGUP003] [HTTP 403] should not allow an user to query
        profile without the required authorization level`, async () => {
      const response = await agent(app)
        .get('/user/profile')
        .set('Authorization', testData.userWithAnotherProfileToken);

      expect(response.status).toBe(StatusCodes.FORBIDDEN);
    });
  });
});

describe('POST /user/authenticate', () => {
  const requestData = userData.postAuthenticate.request;
  const responseData = userData.postAuthenticate.response;
  const interceptorData = userData.postAuthenticate.interceptorData;

  describe('Success scenarios', () => {
    it(`[SPUA001] [HTTP 200] should authenticate an existing
        admin user on website`, async () => {
      userInterceptors.SPUA001(testData.adminUser);
      const response = await agent(app)
        .post('/user/authenticate')
        .send(requestData.adminWebsite);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body?.records[0]?.token).toBeDefined();
      delete response.body.records[0].token;
      expect(response.body.records[0]).toMatchObject(
        responseData.adminWebsite(testData.adminUser)
      );
    });

    it(`[SPUA002] [HTTP 200] should authenticate an existing
        non admin user on mobile`, async () => {
      userInterceptors.SPUA002(testData.nonAdminUser);
      const response = await agent(app)
        .post('/user/authenticate')
        .send(requestData.nonAdminMobile);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body?.records[0]?.token).toBeDefined();
      delete response.body.records[0].token;
      expect(response.body.records[0]).toMatchObject(
        responseData.nonAdminMobile(testData.nonAdminUser)
      );
    });

    it(`[SPUA003] [HTTP 200] should authenticate a new
        user on website`, async () => {
      userInterceptors.SPUA003(interceptorData.SPUA003newUser);
      const response = await agent(app)
        .post('/user/authenticate')
        .send(requestData.newUser);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body?.records[0]?.token).toBeDefined();
      delete response.body.records[0].token;
      expect(response.body.records[0]).toMatchObject(
        responseData.newUser(interceptorData.SPUA003newUser)
      );
    });
  });

  describe('Error scenarios', () => {
    it(`[EPUA001] [HTTP 400] should return an error if trying
        to authenticate an user using an invalid source`, async () => {
      const response = await agent(app)
        .post('/user/authenticate')
        .send(requestData.invalidSource);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it(`[EPUA002] [HTTP 412] should return an error if github API
        does not return a token`, async () => {
      userInterceptors.EPUA002();
      const response = await agent(app)
        .post('/user/authenticate')
        .send(requestData.nonAdminMobile);

      expect(response.status).toBe(StatusCodes.PRECONDITION_FAILED);
    });

    it(`[EPUA003] [HTTP 500] should return an error if github API
        fails to return an user's data`, async () => {
      userInterceptors.EPUA003();
      const response = await agent(app)
        .post('/user/authenticate')
        .send(requestData.nonAdminMobile);

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
