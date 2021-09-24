import { AxiosInstance } from "axios";
// import generalApi from './generalApi';
import { getInstance } from "./BaseService";

function generateCustomHttpService(
  entityName: string,
  customApi: (
    instance: AxiosInstance
  ) => Record<string, (...args: any) => Promise<any>>
) {
  const axiosInstance = getInstance({entityName});
  return {
    [entityName]: {
      ...customApi(axiosInstance)
    }
  };
}

export { generateCustomHttpService };
