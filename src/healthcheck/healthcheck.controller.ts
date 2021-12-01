import { RequestHandler } from 'express';
import { Controller } from '../common/Controller';
import { CheckAppHealth, IAppHealth } from './services/CheckAppHealth';

export class HealthcheckController extends Controller {
  appHealth(): RequestHandler {
    return async (req, res, next) => {
      const result = await new CheckAppHealth().execute();

      const statusCode = result.records[0].databaseStatus.success ? 200 : 500;
      console.log(JSON.stringify(result, null, 2));

      this.renderResponse<IAppHealth>(res, statusCode)(result);
    };
  }
}
