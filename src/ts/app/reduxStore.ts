import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import { appDidStart_authWillGetUser_epic } from "../features/epics/appDidStart";
import { authWillGetUser_authDidGetUser_epic } from "../features/epics/authWillGetUser";
import { authDidSetLoginEmail_authDidGetUserId_epic } from "../features/epics/authDidGetLoginEmail";
import { authWillCreateSession_authWillGetUser_epic } from "../features/epics/authWillCreateSession";
import { authDidCreateSession_authWillGetUser_epic } from "../features/epics/authDidCreateSession";

const epicMiddleware = createEpicMiddleware();
export const rootEpic = combineEpics(
  appDidStart_authWillGetUser_epic,
  authWillGetUser_authDidGetUser_epic,
  authDidSetLoginEmail_authDidGetUserId_epic,
  authWillCreateSession_authWillGetUser_epic,
  authDidCreateSession_authWillGetUser_epic,
);

export const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});
// The next key is key for the epics' linking
epicMiddleware.run(rootEpic as Epic<unknown, unknown, void, any>);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type:
// {auth: AuthState}
export type AppDispatch = typeof reduxStore.dispatch;

export const appDispatch = reduxStore.dispatch;
