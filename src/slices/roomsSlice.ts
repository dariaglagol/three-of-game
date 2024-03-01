import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

export interface RoomInterface {
  id: string,
  name: string,
  owner: string,
  type: 'cpu' | 'human',
}

export interface RoomsState {
  rooms: RoomInterface[] | null;
}

const initialState: RoomsState = {
  rooms: null,
};

/* eslint-disable no-param-reassign */
export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    updateRooms: (state, action: PayloadAction<RoomInterface[]>) => {
      state.rooms = action.payload;
    },
  },
});
/* eslint-enable no-param-reassign */

export const { updateRooms } = roomsSlice.actions;
export const selectRooms = (state: RootState) => state.rooms;

export default roomsSlice.reducer;
