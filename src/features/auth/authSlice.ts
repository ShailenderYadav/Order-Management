// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'analyst' | 'manager' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  user: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: string; role: UserRole }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 