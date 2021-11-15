import { hostname } from 'os';
import fs from 'fs';

const appPackage = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const version = appPackage.version;
export interface IServiceEnvelope<T> {
  meta: {
    self: string;
    version: string;
    count: number;
  };
  records: T[];
}

export class Service<T> {
  envelope(documents: T[] | T): IServiceEnvelope<T> {
    const response = {
      meta: {
        self: hostname(),
        version,
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
