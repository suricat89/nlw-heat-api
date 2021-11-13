import axios, {
  Method,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';
import { NotFound } from '../server/errors';

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
    config: IRequestConfig
  ): Promise<T> {
    const {
      timeout = 5000,
      retries = 2,
      acceptableStatusCodes = this.successStatusCodes,
    } = config;

    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.request({
          ...config,
          method,
          url,
        });

        if (!acceptableStatusCodes.some((s) => s === response.status)) {
          this._logAxiosResponse(response);
        }

        return response.data as T;
      } catch (error) {
        if ((error as AxiosError).isAxiosError) {
          this._logAxiosError(error as AxiosError);
          continue;
        }
        console.log(error);
      }
    }

    throw new NotFound(`Error fetching URL [${method}] '${url}'`);
  }

  _logAxiosResponse(response: AxiosResponse) {
    const objLog = {
      request: response.request,
      response: {
        config: response.config,
        data: response.data,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      },
    };

    console.log(JSON.stringify(objLog));
  }

  _logAxiosError(error: AxiosError) {
    const objError = {
      request: {
        method: error.request?.method,
        protocol: error.request?.protocol,
        host: error.request?.host,
        path: error.request?.path,
        headers: error.request?.headers,
        data: JSON.stringify(error.request),
      },
      response: {
        config: error.response?.config,
        data: error.response?.data,
        headers: error.response?.headers,
        status: error.response?.status,
        statusText: error.response?.statusText,
      },
      message: error.message,
      code: error.code,
    };

    console.log(JSON.stringify(objError));
  }
}
