import { api } from "@/common/constants/api";
import { Login } from "../schema/auth-schema";

export const login = async (data: Login) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const fetchProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};
