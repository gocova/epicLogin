import { Action } from "@reduxjs/toolkit";
import { filter, Observable, mergeMap, catchError, of, switchAll } from "rxjs";
import { didCreateSession, willCreateSession } from "../auth/authSlice";
import { account, ID } from "../appwrite/appwrite";
import { AppwriteException } from "appwrite";

export const authWillCreateSession_authWillGetUser_epic = (
  action$: Observable<Action>,
) =>
  action$.pipe(
    filter(
      (action) =>
        willCreateSession.match(action) &&
        action.payload &&
        typeof action.payload.userId === "string" &&
        typeof action.payload.otp === "string" &&
        action.payload.otp.trim().length > 0,
    ),
    mergeMap(async ({ payload }) => {
      const session = await account.createSession(payload.userId, payload.otp);
      return didCreateSession(session);
    }),
    catchError((err) => {
      let errAction: unknown;
      if (err instanceof AppwriteException) {
        errAction = {
          type: "error/appwriteException",
          errorDetails: err,
        };
      } else {
        errAction = {
          type: "error/unexpectedType",
          errorDetails: err,
        };
        console.error(
          `epic | authWillCreateSession_authWillGetUser_epic | #error | Details: ${JSON.stringify(errAction)}`,
        );
      }
      return of(errAction as Action);
    }),
  );
