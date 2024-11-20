import { apiUrl } from "@/common/constants/app";
import { Login } from "../schema/auth-schema";

export const login = async (data: Login) => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
