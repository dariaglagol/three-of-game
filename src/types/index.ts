import type { PayloadAction } from '@reduxjs/toolkit';

export enum GameStep {
  Login = 'login',
  JoinRoom = 'joinRoom',
  PlayPrep = 'playPrep',
  Play = 'play',
  Leave = 'leave',
  GameOver = 'gameOver',
}

export enum GameState {
  WAIT = 'wait',
  PLAY = 'play',
}

export interface SocketState {
  isConnected: boolean;
  step: GameStep;
  room: {
    name: string | null;
    type: 'human' | 'cpu'
  } | null;
  login: string | null;
  moves: GameMove[];
  activeTurn: GameState;
  winner: {
    user: string | null;
  };
  id: string | null;
}

export type LoginAction = PayloadAction<{
  username: string;
}>;

export type JoinRoomAction = PayloadAction<{
  room: string;
  roomType: 'human' | 'cpu';
}>;

export type GameMove = {
  isCorrectResult?: boolean
  isFirst: boolean
  number: number | string
  selectedNumber?: number
  user?: string
};

export type GameMovePayload = PayloadAction<{
  isCorrectResult?: boolean
  isFirst: boolean
  number: number | string
  selectedNumber?: number
  user?: string
}>;

export type SendNumberPayload = PayloadAction<{
  number: number,
  selectedNumber: number
}>;

export type GameOver = {
  user: string
};

export type Message = {
  user: string,
  message: string,
  room: string,
  socketId?: string
};
