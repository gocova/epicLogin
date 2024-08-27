import { Action } from "@reduxjs/toolkit";
import { filter, Observable, mergeMap, catchError, of } from "rxjs";
import { didGetUser, willGetUser } from "../auth/authSlice";
import { account } from "../appwrite/appwrite";
import { AppwriteException } from "appwrite";

export const authWillGetUser_authDidGetUser_epic = (
  action$: Observable<Action>,
) =>
  action$.pipe(
    filter((action) => willGetUser.match(action)),
    mergeMap(async () => {
      const currAccount = await account.get();
      return didGetUser(currAccount);
    }),
    catchError((err) => {
      let errAction: unknown;
      if (err instanceof AppwriteException) {
        const typedError: AppwriteException = err;
        if (
          typedError.code === 401 &&
          typedError.type === "general_unauthorized_scope"
        ) {
          errAction = didGetUser(undefined);
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
          `epic | authWillGetUser_authDidGetUser_epic | #error | Details: ${JSON.stringify(errAction)}`,
        );
      }
      return of(errAction as Action);
    }),
  );
