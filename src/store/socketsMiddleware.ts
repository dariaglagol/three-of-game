import { Middleware } from "redux";
import {
  connectionEstablished,
  joinRoom,
  leaveRoom,
  initSocket,
  connectionLost,
  login,
  startGame,
  setGameMove,
  handleClick,
  activateTurn,
  gameOver
} from "./SocketSlice";
import SocketFactory from "./SocketFactory";

// import type { SocketInterface } from "./SocketFactory";

enum SocketEvent {
  Connect = "connect",
  Disconnect = "disconnect",
  JoinRoom = "joinRoom",
  LeaveRoom = "leaveRoom",
  Login = "login",
  Error = "error",
  Message = "message",
  LetsPlay = "letsPlay",
  RandomNumber = "randomNumber",
  SendNumber = "sendNumber",
  ActivateYourTurn = "activateYourTurn",
  GameOver = "gameOver"
}

const socketMiddleware: Middleware = (store) => {
  let socket: any;

  return (next) => (action) => {
    if (initSocket.match(action)) {
      if (!socket && typeof window !== "undefined") {
        // Client-side-only code
        // Create/ Get Socket Socket
        socket = SocketFactory.create();

        socket.socket.on(SocketEvent.Connect, () => {
          store.dispatch(connectionEstablished());
        });

        socket.socket.on(SocketEvent.Error, (message: any) => {
          console.error(message);
        });

        // handle all Error events
        socket.socket.on(SocketEvent.Message, (message: any) => {
          console.log(message);
        });

        // Handle disconnect event
        socket.socket.on(SocketEvent.Disconnect, (reason: any) => {
          store.dispatch(connectionLost());
        });
      }
    }

    if (login.match(action) && socket) {
      let {username} = action.payload;
      socket.socket.emit(SocketEvent.Login, {username});
    }

    if (joinRoom.match(action) && socket) {
      let room = action.payload;
      const username = store.getState().socket.login;
      socket.socket.emit(SocketEvent.JoinRoom, {...room, username});
    }

    if (startGame.match(action) && socket) {
      socket.socket.emit(SocketEvent.LetsPlay);
      socket.socket.on(SocketEvent.RandomNumber, (data: any) => {
        store.dispatch(setGameMove(data))
      })
      socket.socket.on(SocketEvent.ActivateYourTurn, (data: any) => {
        store.dispatch(activateTurn(data))
      })
      socket.socket.on(SocketEvent.GameOver, (data: any) => {
        store.dispatch(gameOver(data))
      })
    }

    if (handleClick.match(action) && socket) {
      socket.socket.emit(SocketEvent.SendNumber, action.payload);
    }

    if (leaveRoom.match(action) && socket) {
      socket.socket.emit(SocketEvent.LeaveRoom);
      socket.socket.off(SocketEvent.RandomNumber)
      socket.socket.off(SocketEvent.ActivateYourTurn)
      socket.socket.off(SocketEvent.GameOver)
    }

    next(action);
  };
};

export default socketMiddleware;
