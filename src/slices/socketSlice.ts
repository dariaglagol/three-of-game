import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import {
  GameMovePayload,
  GameOver,
  GameState,
  GameStep,
  JoinRoomAction,
  LoginAction,
  SendNumberPayload,
  SocketState,
} from '../types';

const initialState: SocketState = {
  isConnected: false,
  step: GameStep.Login,
  login: null,
  id: null,
  room: null,
  moves: [],
  activeTurn: GameState.PLAY,
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
      const { room, roomType } = action.payload;
      console.log('joinRoom');
      state.room = {
        name: room,
        type: roomType,
      };
      state.step = GameStep.PlayPrep;
    },
    setUserSocketId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    waitForPlayer: () => {},
    startGame: (state) => {
      state.step = GameStep.Play;
    },
    setGameMove: (state, action: GameMovePayload) => {
      const move = action.payload;
      state.moves = [...state.moves, move];
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendNumber: (state, action: SendNumberPayload) => {
      state.activeTurn = GameState.WAIT;
    },
    activateTurn: (state, action) => {
      if (action.payload.user === state.id) {
        state.activeTurn = action.payload.state;
      } else {
        state.activeTurn = action.payload.state === GameState.PLAY
          ? GameState.WAIT : GameState.PLAY;
      }
    },
    leaveRoom: (state) => {
      state.step = GameStep.Leave;
      state.moves = [];
      state.room = null;
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
  waitForPlayer,
  setUserSocketId,
} = socketSlice.actions;
// Export the reducer for this slice
export default socketSlice.reducer;
