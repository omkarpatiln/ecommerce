import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserDetails {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
}

interface UserState {
  token: string | null;
  user: UserDetails | null;
}

const initialState: UserState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<{ token: string; user: UserDetails }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    clearUser(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;
