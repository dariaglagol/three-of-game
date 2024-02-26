import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface GameMove {
  isCorrectResult: boolean
  isFirst: boolean
  number: number | string
  selectedNumber: number
  user: string
}

export interface CounterState {
  moves: GameMove[]
}

const initialState: CounterState = {
  moves: []
}

export const movesSlice = createSlice({
  name: 'moves',
  initialState,
  reducers: {
    addNewMove: (state, action: PayloadAction<CounterState>) => {
      // @ts-ignore
      state.moves = [...state.moves, action.payload]
    }
  }
})

export const {addNewMove} = movesSlice.actions
export const movesList = (state: RootState) => state.moves

export default movesSlice.reducer