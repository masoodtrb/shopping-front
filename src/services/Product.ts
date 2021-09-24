import { AxiosInstance } from "axios";
import { generateCustomHttpService } from "./Services";

export const ProductService = {
  ...generateCustomHttpService("products", (instance: AxiosInstance) => ({
    list: (filter) => instance.get(`/${filter}`),
    load: (id: string) => instance.get(`/${id}`),
    count: () => instance.post("/count"),
  }))
};