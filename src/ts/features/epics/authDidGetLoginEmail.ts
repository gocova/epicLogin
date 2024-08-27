import { Action } from "@reduxjs/toolkit";
import { filter, Observable, mergeMap, catchError, of } from "rxjs";
import { didGetLoginEmail, didGetUserId } from "../auth/authSlice";
import { account, ID } from "../appwrite/appwrite";
import { AppwriteException } from "appwrite";

export const authDidSetLoginEmail_authDidGetUserId_epic = (
  action$: Observable<Action>,
) =>
  action$.pipe(
    filter(
      (action) =>
        didGetLoginEmail.match(action) &&
        typeof action.payload === "string" &&
        action.payload.trim().length > 0,
    ),
    mergeMap(async ({ payload: email }) => {
      const userId = await account.createEmailToken(ID.unique(), email);
      return didGetUserId(userId.userId);
    }),
    catchError((err) => {
      let errAction: unknown;
      if (err instanceof AppwriteException) {
        const typedError: AppwriteException = err;
        if (
          typedError.code === 400 &&
          typedError.type === "user_count_exceeded"
        ) {
          errAction = {
            type: "auth/didGetAuthError",
            payload: {
              errorMessage: `The provided email is not registered. Please contact the administrator to request access.`,
              stage: "login",
              type: "didGetUnregisteredUser",
            },
          };
        } else {
          errAction = {
            type: "error/appwriteException",
            errorDetails: err,
          };
        }
      } else {
        errAction = {
          type: "error/unexpectedType",
          errorDetails: err,
        };
        console.error(
          `epic | authDidSetLoginEmail_authDidGetUserId_epic | #error | Details: ${JSON.stringify(errAction)}`,
        );
      }
      return of(errAction as Action);
    }),
  );
