import { Service } from '../../common/Service';
import prismaClient from '../../config/database';

interface IDatabaseStatus {
  success: boolean;
  response: any;
}

export interface IAppHealth {
  databaseStatus: IDatabaseStatus;
}

export class CheckAppHealth extends Service<IAppHealth> {
  async execute() {
    const databaseStatus = await this._checkDatabaseConnectivity();

    return this.envelope({ databaseStatus });
  }

  async _checkDatabaseConnectivity(): Promise<IDatabaseStatus> {
    try {
      await prismaClient.$connect();
      const response = await prismaClient.$queryRaw`SELECT 'OK' AS status;`;
      return {
        success: true,
        response: response[0],
      };
    } catch (error) {
      return {
        success: false,
        response: {
          message: error.message,
          stack: error.stack,
          ...error,
        },
      };
    }
  }
}
