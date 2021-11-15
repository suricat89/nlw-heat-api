import { RequestHandler } from 'express';
import { Controller } from '../common/Controller';
import { CheckAppHealth, IAppHealth } from './services/CheckAppHealth';

export class HealthcheckController extends Controller {
  appHealth(): RequestHandler {
    return async (req, res, next) => {
      const result = await new CheckAppHealth().execute();

      this.renderResponse<IAppHealth>(res)(result);
    };
  }
}
