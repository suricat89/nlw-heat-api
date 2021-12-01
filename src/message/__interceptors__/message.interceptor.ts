import { io, _initSocket } from '../../server/app';
import { Server } from 'socket.io';

function setDefaultPostMessageInterceptor() {
  jest.spyOn(io, 'emit').mockReturnValueOnce(true);
}

export const messageInterceptors = {
  SPM001: setDefaultPostMessageInterceptor,
  EPM001: setDefaultPostMessageInterceptor
};
