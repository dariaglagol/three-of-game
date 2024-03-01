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
} from '../slices/SocketSlice';
import SocketFactory from './SocketFactory';
import {
  GameMove as GameOverType,
  GameOver,
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
        });

        // Handle disconnect event
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
    }

    if (startGame.match(action) && socket) {
      socket.socket.emit(SocketEvent.LetsPlay);
      socket.socket.on(SocketEvent.RandomNumber, (data: GameOverType) => {
        store.dispatch(setGameMove(data));
      });
      socket.socket.on(SocketEvent.ActivateYourTurn, (data: { state: GameState }) => {
        store.dispatch(activateTurn(data));
      });
      socket.socket.on(SocketEvent.GameOver, (data: GameOver) => {
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
