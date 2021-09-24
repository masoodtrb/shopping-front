export enum ActionTypes {
  Login = "[Root] Login",
  Logout = "[Root] Logout",
  SetAuthLoading = "[Root] SetAuthLoading",
  SetUserInfo = "[Root] SetUserInfo"
}

export interface Login {
  type: ActionTypes.Login | ActionTypes.Logout;
  token: string | null;
}

export interface Logout {
  type: ActionTypes.Logout;
}

export interface SetUserInfo {
  type: ActionTypes.SetUserInfo;
  user: any
}

export interface SetAuthLoading {
  type: ActionTypes.SetAuthLoading;
  authLoading: boolean;
}

export type RootActions = Login | Logout | SetUserInfo | SetAuthLoading;

export function login(token: string): Login {
  return {
    type: ActionTypes.Login,
    token
  };
}

export function logout(): Logout {
  return {
    type: ActionTypes.Logout
  };
}

export function setAuthLoading(authLoading: boolean): SetAuthLoading {
  return {
    type: ActionTypes.SetAuthLoading,
    authLoading
  };
}

export function setUserInfo(user: any): SetUserInfo {
  return {
    type: ActionTypes.SetUserInfo,
    user
  };
}
