import { CheckAppHealth } from '../services/CheckAppHealth';

export const healthcheckInterceptors = {
  EGH001() {
    jest
      .spyOn(CheckAppHealth.prototype, '_executeTestQuery')
      .mockRejectedValueOnce(new Error('Test error'));
  }
};
