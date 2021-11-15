import 'dotenv/config';
import express, { Express } from 'express';
import 'express-async-errors';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import util from 'util';
import environment from '../config/environment';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

let server: http.Server;
export let io: Server;

async function _initApp() {
  const app = express();
  server = http.createServer(app);

  app.use(cors());
  app.use(express.json());

  app.use(routes);
  app.use(errorHandler);

  return app;
}

function _initSocket(app: Express) {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected on socket ${socket.id}`);
  });
}

export async function bootstrap() {
  const app = await _initApp();
  _initSocket(app);

  server.listen(environment.application.port, () => {
    console.log(`App listening on port ${environment.application.port}`);
  });
};
