import { Action } from "@reduxjs/toolkit";
import { map, filter, Observable } from "rxjs";
import { didCreateSession, willGetUser } from "../auth/authSlice";

export const authDidCreateSession_authWillGetUser_epic = (
  action$: Observable<Action>,
) =>
  action$.pipe(
    filter((action) => didCreateSession.match(action)),
    map(() => willGetUser()),
  );
