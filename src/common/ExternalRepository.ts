import axios, {
  Method,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';
import { InternalServerError } from '../server/errors';

interface IRequestConfig extends Omit<AxiosRequestConfig, 'url' | 'method'> {
  timeout?: number;
  retries?: number;
  acceptableStatusCodes?: number[];
}

export class ExternalRepository {
  successStatusCodes: number[];
  constructor() {
    this.successStatusCodes = Array.from({ length: 100 }).map(
      (v, i) => i + 200
    );
  }

  async dispatchRequest<T>(
    method: Method,
    url: string,
    config: IRequestConfig = {}
  ): Promise<T> {
    const {
      timeout = 5000,
      retries = 2,
      acceptableStatusCodes = this.successStatusCodes
    } = config;

    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.request({
          ...config,
          timeout,
          method,
          url
        });

        if (!acceptableStatusCodes.some((s) => s === response.status)) {
          this._logAxiosResponse(response, config.data);
        }

        return response.data as T;
      } catch (error) {
        if ((error as AxiosError).isAxiosError) {
          this._logAxiosError(error as AxiosError, config.data);
          continue;
        }
        console.error(error);
      }
    }

    throw new InternalServerError(`Error fetching URL [${method}] '${url}'`);
  }

  _logAxiosResponse(response: AxiosResponse, reqData: any) {
    const objLog = {
      request: {
        method: response.request.method,
        protocol: response.request.protocol,
        host: response.request.host,
        path: response.request.path,
        headers: response.request.headers,
        data: reqData
      },
      response: {
        config: response.config,
        data: response.data,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText
      }
    };

    console.log(JSON.stringify(objLog));
  }

  _logAxiosError(error: AxiosError, reqData: any) {
    const objError = {
      request: {
        method: error.request.method,
        protocol: error.request.protocol,
        host: error.request.host,
        path: error.request.path,
        headers: error.request.headers,
        data: reqData
      },
      response: {
        config: error.response.config,
        data: error.response.data,
        headers: error.response.headers,
        status: error.response.status,
        statusText: error.response.statusText
      },
      message: error.message,
      code: error.code
    };

    console.log(JSON.stringify(objError));
  }
}
