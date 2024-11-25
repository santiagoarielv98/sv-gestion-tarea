import { api } from "@/constants/api";
import { Login, Register } from "../schema/auth-schema";

export const login = async (data: Login) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (
  data: Omit<Register, "passwordConfirmation">
) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const fetchProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};
