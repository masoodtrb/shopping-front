import localStorageHelper from "../Utils/LocalStorageHelper";

export function requestInterceptors(request: any) {
  const requestsWithoutTokenPaths = ["load-my-tenant", "file/"];
  if (
    requestsWithoutTokenPaths.reduce(
      (acc: boolean, path: string) => acc || request.url.includes(path),
      false
    )
  ) {
    return request;
  }
  const token = localStorageHelper.getItem("accessToken");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
}

export function requestError(error: any) {
  return Promise.reject(error);
}
