import localStorageHelper from "../../Utils/LocalStorageHelper";
import * as fromActions from "./actions";

export interface _RootReducerState {
  token: string | null;
  hasAuth: boolean;
  authLoading: boolean;
  user: any | null;
}

export const RootInitialState: _RootReducerState = {
  token: localStorageHelper.getItem("accessToken"),
  user: null,
  hasAuth: false,
  authLoading: false
};

export function RootReducer(
  state: _RootReducerState,
  action: fromActions.RootActions
): _RootReducerState {
  switch (action.type) {
    case fromActions.ActionTypes.Logout: {
      return {
        ...state,
        token: null,
        hasAuth: false,
        user: null
      };
    }
    case fromActions.ActionTypes.Login: {
      return {
        ...state,
        token: action.token
      };
    }
    case fromActions.ActionTypes.SetUserInfo: {
      return {
        ...state,
        user: action.user,
        hasAuth: true
      };
    }
    default:
      return state;
  }
}
