// Slice of store that manages Socket connections
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

enum GameStep {
  Login = "login",
  JoinRoom = "joinRoom",
  PlayPrep = 'playPrep',
  Play = "play",
  Leave = "leave",
  GameOver = 'gameOver'
}

export enum GameState {
  WAIT = "wait",
  PLAY = "play",
}

export interface SocketState {
  isConnected: boolean;
  step: GameStep;
  room: string | null;
  login: string | null;
  moves: GameMove[];
  isTurnActive: GameState;
  winner: {
    user: string | null;
  }
}

const initialState: SocketState = {
  isConnected: false,
  step: GameStep.Login,
  login: null,
  room: null,
  moves: [],
  isTurnActive: GameState.PLAY,
  winner: {
    user: null
  }
};

type LoginAction = PayloadAction<{
  username: string;
}>;

type JoinRoomAction = PayloadAction<{
  room: string;
  roomType: string;
}>;

export type GameMove = {
  isCorrectResult: boolean
  isFirst: boolean
  number: number | string
  selectedNumber: number
  user: string
}

export type GameMovePayload = PayloadAction<{
  isCorrectResult: boolean
  isFirst: boolean
  number: number | string
  selectedNumber: number
  user: string
}>

export type Tui = PayloadAction<{
  number: number,
  selectedNumber: number
}>

export type GameOverPayload = PayloadAction<{
  user: string
}>

// Now create the slice
const socketSlice = createSlice({
  name: "socket",
  initialState,
  // Reducers: Functions we can call on the store
  reducers: {
    initSocket: (state) => {},
    connectionEstablished: (state) => {
      state.isConnected = true;
    },
    connectionLost: (state) => {
      state.isConnected = false;
    },
    login: (state, action: LoginAction) => {
      let {username} = action.payload;
      state.login = username;
      state.step = GameStep.JoinRoom
    },
    joinRoom: (state, action: JoinRoomAction) => {
      let {room} = action.payload;
      state.room = room;
      state.step = GameStep.PlayPrep
    },
    startGame: (state) => {
      state.step = GameStep.Play
    },
    setGameMove: (state, action: GameMovePayload) => {
      const move = action.payload;
      // @ts-ignore
      state.moves = [...state.moves, move]
    },
    handleClick: (state, action: Tui) => {},
    activateTurn: (state, action) => {
      state.isTurnActive = action.payload.state
    },
    leaveRoom: (state) => {
      state.step = GameStep.Leave
    },
    gameOver: (state, action: GameOverPayload) => {
      const data = action.payload
      console.log('data', data)
      state.winner = {
        user: data.user
      }
      state.step = GameStep.GameOver
    }
  },
  selectors: {
    selectLastMove: (state) => state.moves[state.moves.length - 1] || {}
  }
});

export const { selectLastMove } = socketSlice.selectors

// Don't have to define actions, they are automatically generated
export const {
  initSocket,
  connectionEstablished,
  connectionLost,
  joinRoom,
  login,
  startGame,
  setGameMove,
  handleClick,
  activateTurn,
  leaveRoom,
  gameOver
} = socketSlice.actions;
// Export the reducer for this slice
export default socketSlice.reducer;