import * as SecureStore from "expo-secure-store";
import { apiPost, apiGet, ApiResult } from "./apiClient";
import { LoginResponse, UserType } from "@/constants/types/authTypes";

async function saveToken(token: string) {
  await SecureStore.setItemAsync("token", token);
}

export const loginApi = async (
  email: string,
  password: string
): Promise<ApiResult<LoginResponse>> => {
  const res = await apiPost<{ email: string; password: string }, LoginResponse>(
    "/api/auth/login",
    { email, password }
  );

  if (!res.success || !res.data?.token) return res;

  await saveToken(res.data.token);
  return res;
};


export const registerApi = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
): Promise<ApiResult<LoginResponse>> => {
  const res = await apiPost<
    {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
    },
    LoginResponse
  >("/api/auth/register", {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
  });

  if (!res.success || !res.data?.token) return res;

  await saveToken(res.data.token);
  return res;
};


export const googleLoginApi = async (
  idToken: string
): Promise<ApiResult<LoginResponse>> => {
  const res = await apiPost<{ idToken: string }, LoginResponse>(
    "/api/auth/google",
    { idToken }
  );

  if (!res.success || !res.data?.token) return res;

  await saveToken(res.data.token);
  return res;
};


export const meApi = async (): Promise<ApiResult<UserType>> => {
  return apiGet<UserType>("/api/auth/me");
};


export const logoutApi = async () => {
  await SecureStore.deleteItemAsync("token");
};
