import { Action } from "@reduxjs/toolkit";
import { map, filter, Observable } from "rxjs";
import { willGetUser } from "../auth/authSlice";

export const appDidStart_authWillGetUser_epic = (action$: Observable<Action>) =>
  action$.pipe(
    filter((action) => action?.type === "app/didStart"),
    map(() => willGetUser()),
  );
