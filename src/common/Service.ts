import { hostname } from 'os';

export interface IServiceEnvelope<T> {
  meta: {
    self: string;
    count: number;
  };
  records: T[];
}

export class Service<T> {
  envelope(documents: T[] | T): IServiceEnvelope<T> {
    const response = {
      meta: {
        self: hostname(),
        count: 1,
      },
      records: [],
    };

    if (Array.isArray(documents)) {
      response.records = documents;
      response.meta.count = documents.length;
    } else if (documents) {
      response.records = [documents];
    }

    return response;
  }
}
