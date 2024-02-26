import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface RoomInterface {
  id: string,
  name: string,
  owner: string,
  type: 'cpu' | 'human'
}

export interface CounterState {
  rooms: RoomInterface[] | null
}

const initialState: CounterState = {
  rooms: null
}

export const counterSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<CounterState>) => {
      // @ts-ignore
      state.rooms = action.payload
    }
  }
})

export const {incrementByAmount } = counterSlice.actions
export const selectRooms = (state: RootState) => state.rooms

export default counterSlice.reducer