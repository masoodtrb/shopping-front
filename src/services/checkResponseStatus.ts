function checkStatusCodeLength(statusCode: number): boolean {
    return String(statusCode).length !== 3;
  }
  
  export default function isSuccessfulResponse(statusCode: number): boolean {
    if (!checkStatusCodeLength(statusCode)) {
      return statusCode >= 200 && statusCode <= 299;
    } else {
      return false;
    }
  }
  
  export function isRedirectsResponse(statusCode: number): boolean {
    if (!checkStatusCodeLength(statusCode)) {
      return statusCode >= 300 && statusCode <= 399;
    } else {
      return false;
    }
  }
  
  export function isClientErrorsResponse(statusCode: number): boolean {
    if (!checkStatusCodeLength(statusCode)) {
      return statusCode >= 400 && statusCode <= 499;
    } else {
      return false;
    }
  }
  
  export function isServerErrorsResponse(statusCode: number): boolean {
    if (!checkStatusCodeLength(statusCode)) {
      return statusCode >= 500 && statusCode <= 599;
    } else {
      return false;
    }
  }
  