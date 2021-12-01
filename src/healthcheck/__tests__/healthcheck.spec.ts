import { agent } from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { _initApp } from '../../server/app';
import { prismaClient } from '../../config/database';
import { healthcheckData } from '../__data__/healthcheck.data';
import { healthcheckInterceptors } from '../__interceptors__/healthcheck.interceptor';

let app: Express.Application;
beforeAll(async () => {
  app = await _initApp();
});

describe('GET /ping', () => {
  describe('Success scenarios', () => {
    it('[SGP001] [HTTP 200] should ping', async () => {
      const response = await agent(app).get('/ping');
      expect(response.status).toBe(StatusCodes.OK);
    });
  });
});

describe('GET /health', () => {
  describe('Success scenarios', () => {
    it('[SGH001] [HTTP 200] should be healthy', async () => {
      const response = await agent(app).get('/health');
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.records[0]).toMatchObject(healthcheckData.success);
    });
  });

  describe('Error scenarios', () => {
    it(`[EGH001] [HTTP 500] should be unhealthy if 
        it can't query on PostgresDB`, async () => {
      healthcheckInterceptors.EGH001();

      const response = await agent(app).get('/health');
      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body.records[0]).toMatchObject(healthcheckData.error);

      await prismaClient.$connect();
    });
  });
});
