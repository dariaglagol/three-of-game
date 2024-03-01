import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

export interface UserInterface {
  id: string,
  name: string,
  room: string,
  type: 'cpu' | 'human',
}

export interface UsersState {
  users: UserInterface[],
}

const initialState: UsersState = {
  users: [],
};

/* eslint-disable no-param-reassign */
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserInterface[]>) => {
      const user = action.payload;
      state.users = [...state.users, ...user];
    },
  },
});
/* eslint-enable no-param-reassign */

export const { setUsers } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
