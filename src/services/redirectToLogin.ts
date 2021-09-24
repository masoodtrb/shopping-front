import localStorageHelper from "../Utils/LocalStorageHelper";

const guide = 'hamsa'

export function redirectToLogin() {
  localStorageHelper.removeItem('accessToken');
  let redirectTo = `/login?redirect_to=`;
  if (process.env.NODE_ENV !== 'development') {
    redirectTo = `/${guide}${redirectTo}${
      window.location.href.split(guide)[1]
    }`;
  } else {
    redirectTo = `${redirectTo}${
      window.location.href.split(`${process.env.PORT}`)[1]
    }`;
  }
  window.location.href = redirectTo;
}

export default redirectToLogin;
