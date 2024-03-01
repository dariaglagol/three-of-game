import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

import {
  LoginAction,
  GameState,
  SocketState,
  GameStep,
  GameMovePayload,
  GameOver,
  SendNumberPayload,
  JoinRoomAction,
} from '../types';

const initialState: SocketState = {
  isConnected: false,
  step: GameStep.Login,
  login: null,
  room: null,
  moves: [],
  isTurnActive: GameState.PLAY,
  winner: {
    user: null,
  },
};

/* eslint-disable no-param-reassign */
const socketSlice = createSlice({
  name: 'socket',
  initialState,
  // Reducers: Functions we can call on the store
  reducers: {
    initSocket: () => {},
    connectionEstablished: (state) => {
      state.isConnected = true;
    },
    connectionLost: (state) => {
      state.isConnected = false;
    },
    login: (state, action: LoginAction) => {
      const { username } = action.payload;
      state.login = username;
      state.step = GameStep.JoinRoom;
    },
    joinRoom: (state, action: JoinRoomAction) => {
      const { room } = action.payload;
      state.room = room;
      state.step = GameStep.PlayPrep;
    },
    startGame: (state) => {
      state.step = GameStep.Play;
    },
    setGameMove: (state, action: GameMovePayload) => {
      const move = action.payload;
      state.moves = [...state.moves, move];
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendNumber: (state, action: SendNumberPayload) => {},
    activateTurn: (state, action) => {
      state.isTurnActive = action.payload.state;
    },
    leaveRoom: (state) => {
      state.step = GameStep.Leave;
      state.moves = [];
    },
    gameOver: (state, action: PayloadAction<GameOver>) => {
      const data = action.payload;
      state.winner = {
        user: data.user,
      };
      state.moves = [];
      state.step = GameStep.GameOver;
    },
  },
  selectors: {
    selectLastMove: (state) => state.moves[state.moves.length - 1] || {},
  },
});
/* eslint-enable no-param-reassign */

export const { selectLastMove } = socketSlice.selectors;

// Don't have to define actions, they are automatically generated
export const {
  initSocket,
  connectionEstablished,
  connectionLost,
  joinRoom,
  login,
  startGame,
  setGameMove,
  sendNumber,
  activateTurn,
  leaveRoom,
  gameOver,
} = socketSlice.actions;
// Export the reducer for this slice
export default socketSlice.reducer;
