import axios from "axios";
import { requestError, requestInterceptors } from "./request.interceptor";
import { responseError, responseInterceptors } from "./response.interceptor";

export type InstanceConfigType = {
    entityName: string;
};
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export function getInstance({ entityName }: InstanceConfigType) {
  const instance = axios.create({
    baseURL: `/api/${entityName}`,
    cancelToken: Boolean(source) ? source.token : undefined,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json"
    },
    maxRedirects: 0
  });

  instance.interceptors.request.use(requestInterceptors, requestError);
  instance.interceptors.response.use(responseInterceptors, responseError);
  return instance;
}
