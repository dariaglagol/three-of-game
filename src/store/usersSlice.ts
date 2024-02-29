import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

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

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UsersState>) => {
      // @ts-ignore
      state.users = [...state.users, action.payload];
    },
  },
});

export const { setUsers } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
