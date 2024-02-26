import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
export interface CounterState {
  userData: any
}

const initialState: CounterState = {
  userData: null
}

export const counterSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CounterState>) => {
      // @ts-ignore
      state.userData = action.payload
    }
  }
})

export const {setUser} = counterSlice.actions
export const selectUserData = (state: RootState) => state.userData

export default counterSlice.reducer