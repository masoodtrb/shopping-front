import { AxiosInstance } from "axios";
import { generateCustomHttpService } from "./Services";

export const UserService = {
  ...generateCustomHttpService("users", (instance: AxiosInstance) => ({
    login: (credentials) => instance.post("/login", credentials),
    register: (data: any) => instance.post("/", data),
    me: () => instance.get("/me"),
    updateMe: (id: string, data) => instance.put(`/${id}`, data)
  }))
};
