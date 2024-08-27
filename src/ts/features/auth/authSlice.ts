import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: object | undefined;
  state: "ready" | "waiting";
  userId: string | undefined;
}

interface NewSessionRequest {
  userId: string;
  otp: string;
}

const initialState: AuthState = {
  user: undefined,
  state: "waiting",
  userId: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    willGetUser: (state) => {},
    didGetUser: (state, action: PayloadAction<object | undefined>) => {
      state.user = action.payload;
      state.state = "ready";
    },
    didGetLoginEmail: (state, action: PayloadAction<string | undefined>) => {
      state.state = action.payload === undefined ? "ready" : "waiting";
    },
    didGetUserId: (state, action: PayloadAction<string | undefined>) => {
      state.state = "ready";
      state.userId = action.payload;
    },
    willCreateSession: (state, action: PayloadAction<NewSessionRequest>) => {
      // Empty Placeholder
    },
    didCreateSession: (state, action: PayloadAction<any>) => {
      // Empty Placeholder
    },
  },
});

export const {
  willGetUser,
  didGetUser,
  didGetLoginEmail,
  didGetUserId,
  willCreateSession,
  didCreateSession,
} = authSlice.actions;

export default authSlice.reducer;
