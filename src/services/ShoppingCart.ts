import { AxiosInstance } from "axios";
import { generateCustomHttpService } from "./Services";

export const ShoopingCart = {
  ...generateCustomHttpService("shoppingCarts", (instance: AxiosInstance) => ({
    addToCart: (userId: string, item) => instance.post(`/${userId}/item`, item),
    list: (userId: string) => instance.get(`/${userId}`),
    clear: (userId: string) => instance.delete(`/${userId}`),
  }))
};