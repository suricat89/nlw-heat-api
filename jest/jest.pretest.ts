import async, { AsyncResultCallback } from 'async';
import { clearDatabase, populateTestData, setEnvironment } from './global';

async.waterfall([
  (callback: AsyncResultCallback<void>) => {
    setEnvironment();
    return callback();
  },
  (callback: AsyncResultCallback<void>) => {
    clearDatabase()
      .then(() => {
        return callback();
      })
      .catch((error) => {
        callback(error);
      });
  },
  (callback: AsyncResultCallback<void>) => {
    populateTestData()
      .then(() => {
        return callback();
      })
      .catch((error) => {
        callback(error);
      });
  },
]);
