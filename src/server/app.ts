import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import util from 'util';
import environment from '../config/environment';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

export let server: http.Server;
export let io: Server;

const _initApp = async () => {
  const app = express();
  server = http.createServer(app);
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected on socket ${socket.id}`);
  });

  app.use(cors());
  app.use(express.json());

  app.use(routes);
  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  app.use(errorHandler);

  const serverListen = util.promisify(server.listen.bind(server));
  await serverListen(environment.application.port);
  console.log(`App listening on port ${environment.application.port}`);
};

export const bootstrap = async () => {
  await _initApp();
};
