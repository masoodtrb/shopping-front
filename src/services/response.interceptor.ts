import { showToastify } from "../Components/Toastify";
import axios, { AxiosError } from "axios";
import { get } from "lodash";
import isSuccessfulResponse, {
  isRedirectsResponse
} from "./checkResponseStatus";
import { redirectToLogin } from "./redirectToLogin";

class FetchError extends Error {
  constructor(public res: Response, message?: string) {
    super(message);
  }
}

const showSuccessMessage = [
  "removeEntities",
  "purgeEntities",
  "restoreEntities",
  "saveOrUpdate"
];

export function responseInterceptors(response: any) {
  const responseStatus = get(response, "status", 200);
  const responseStatusText = get(response, "statusText", "Ok");
  const responseMessage = get(response, "data.message", "Success!");

  if (isSuccessfulResponse(responseStatus)) {
    const serviceName = response.config.url.slice(1);
    if (showSuccessMessage.includes(serviceName)) {
      showToastify.success(responseMessage);
    }
    return response.data;
  } else {
    throw new FetchError(responseStatus, responseStatusText);
  }
}

export function responseError(error: AxiosError) {
  const responseStatus = get(error, "response.status", "400");
  const responseStatusText = get(error, "response.statusText", "");

  if (!axios.isCancel(error)) {
    const msg = get(error, "response.data.error.message", "Unknown Error!!!");

    if (get(error, "config.url", "").includes("token")) {
      showToastify.error("invalid username or password");
    } else {
      showToastify.error(msg);
    }

    if (403 === responseStatus || isRedirectsResponse(responseStatus)) {
      redirectToLogin();
      return null;
    }
    throw new FetchError(responseStatus, responseStatusText);
  } else {
    throw new FetchError(responseStatus, responseStatusText);
  }
}
