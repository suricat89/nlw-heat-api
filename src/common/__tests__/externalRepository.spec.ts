import { ExternalRepository } from '../ExternalRepository';
import { externalRepositoryInterceptors as interceptors } from '../__interceptors__/externalRepository.interceptor';
import { externalRepositoryData as data } from '../__data__/externalRepository.data';
import { InternalServerError, NotFound } from '../../server/errors';

let externalRepository: ExternalRepository;
beforeAll(() => {
  externalRepository = new ExternalRepository();
});

describe('common/ExternalRepository Unit tests', () => {
  describe('Success scenarios', () => {
    it(`[UTSCER001] should access an API with success with
        statusCode 200`, async () => {
      interceptors.UTSCER001(data.success);
      const response = await externalRepository.dispatchRequest(
        'GET',
        'https://github.com/test'
      );

      expect(response).toMatchObject(data.success);
    });

    it(`[UTSCER002] should access an API with success with
        statusCode 201 when I was expecting a 200`, async () => {
      interceptors.UTSCER002(data.success);
      const response = await externalRepository.dispatchRequest(
        'GET',
        'https://github.com/test',
        {
          acceptableStatusCodes: [200],
        }
      );

      expect(response).toMatchObject(data.success);
    });
  });

  describe('Error scenarios', () => {
    it(`[UTECER001] should throw an error if the requested API
        return any non 2xx statusCode`, async () => {
      interceptors.UTECER001();

      await expect(async () => {
        await externalRepository.dispatchRequest(
          'GET',
          'https://github.com/test'
        );
      }).rejects.toThrow(InternalServerError);
    });

    it(`[UTECER002] should throw an error if the requested API
        return any non 2xx statusCode`, async () => {
      interceptors.UTECER002();

      await expect(async () => {
        await externalRepository.dispatchRequest(
          'GET',
          'https://github.com/test'
        );
      }).rejects.toThrow(InternalServerError);
    });
  });
});
