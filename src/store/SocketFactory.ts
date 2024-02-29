// @ts-ignore
import io from "socket.io-client";

class SocketConnection {
  public socket: any;
  // The constructor will initialize the Socket Connection
  constructor() {
    this.socket = io('ws://localhost:8082');
  }
}

let socketConnection: SocketConnection | undefined;

// The SocketFactory is responsible for creating and returning a single instance of the SocketConnection class
// Implementing the singleton pattern
class SocketFactory {
  public static create(): SocketConnection {
    if (!socketConnection) {
      socketConnection = new SocketConnection();
    }
    return socketConnection;
  }
}

export default SocketFactory;