import { Middleware } from 'redux';
import {
  connectionEstablished,
  joinRoom,
  leaveRoom,
  initSocket,
  connectionLost,
  login,
  startGame,
  setGameMove,
  activateTurn,
  gameOver,
  sendNumber,
  waitForPlayer,
  setUserSocketId,
} from '../slices/socketSlice';
import SocketFactory from './socketFactory';
import {
  GameMove,
  GameOver as GameOverType,
  GameState,
  Message as MessageType,
} from '../types';

enum SocketEvent {
  Connect = 'connect',
  Disconnect = 'disconnect',
  JoinRoom = 'joinRoom',
  LeaveRoom = 'leaveRoom',
  Login = 'login',
  Error = 'error',
  Message = 'message',
  LetsPlay = 'letsPlay',
  RandomNumber = 'randomNumber',
  SendNumber = 'sendNumber',
  ActivateYourTurn = 'activateYourTurn',
  GameOver = 'gameOver',
}

const socketMiddleware: Middleware = (store) => {
  let socket: any;

  return (next) => (action) => {
    if (initSocket.match(action)) {
      if (!socket && typeof window !== 'undefined') {
        socket = SocketFactory.create();

        socket.socket.on(SocketEvent.Connect, () => {
          store.dispatch(connectionEstablished());
        });

        socket.socket.on(SocketEvent.Error, (error: { message: string }) => {
          console.error(error);
        });

        socket.socket.on(SocketEvent.Message, (message: MessageType) => {
          console.log(message);
          // check if user is joining to room.
          // Better will be to add possibility to broadcast
          // event from the BE after new user joined.
          if (message.message.indexOf('has') > -1) {
            store.dispatch(waitForPlayer());
          }

          if (!store.getState().socket.id && message.socketId) {
            store.dispatch(setUserSocketId(message.socketId));
          }
        });

        socket.socket.on(SocketEvent.Disconnect, () => {
          store.dispatch(connectionLost());
        });
      }
    }

    if (login.match(action) && socket) {
      const { username } = action.payload;
      socket.socket.emit(SocketEvent.Login, { username });
    }

    if (joinRoom.match(action) && socket) {
      const room = action.payload;
      const username = store.getState().socket.login;
      socket.socket.emit(SocketEvent.JoinRoom, { ...room, username });
      socket.socket.on('onReady', () => {
        if (room.roomType === 'human') {
          store.dispatch(startGame());
        }
      });
    }

    if (waitForPlayer.match(action)) {
      const { type } = store.getState().socket.room;
      socket.socket.emit(SocketEvent.LetsPlay);
      if (type === 'cpu') {
        store.dispatch(startGame());
      }
    }

    if (startGame.match(action) && socket) {
      socket.socket.on(SocketEvent.RandomNumber, (data: GameMove) => {
        store.dispatch(setGameMove(data));
      });
      socket.socket.on(SocketEvent.ActivateYourTurn, (data: { state: GameState }) => {
        store.dispatch(activateTurn(data));
      });
      socket.socket.on(SocketEvent.GameOver, (data: GameOverType) => {
        store.dispatch(gameOver(data));
      });
    }

    if (sendNumber.match(action) && socket) {
      socket.socket.emit(SocketEvent.SendNumber, action.payload);
    }

    if (leaveRoom.match(action) && socket) {
      socket.socket.emit(SocketEvent.LeaveRoom);
      socket.socket.off(SocketEvent.RandomNumber);
      socket.socket.off(SocketEvent.ActivateYourTurn);
      socket.socket.off(SocketEvent.GameOver);
    }

    next(action);
  };
};

export default socketMiddleware;
