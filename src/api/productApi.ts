import { apiGet, ApiResult } from "./apiClient";
import {
  CoffeeDto,
  TeaDto,
  CakeDto,
  CookieDto,
} from "@/constants/types/homeTypes";

export const getCoffeesApi = async (): Promise<ApiResult<CoffeeDto[]>> => {
  return apiGet<CoffeeDto[]>("/api/products/coffee");
};

export const getTeasApi = async (): Promise<ApiResult<TeaDto[]>> => {
  return apiGet<TeaDto[]>("/api/products/tea");
};

export const getCakesApi = async (): Promise<ApiResult<CakeDto[]>> => {
  return apiGet<CakeDto[]>("/api/products/cake");
};

export const getCookiesApi = async (): Promise<ApiResult<CookieDto[]>> => {
  return apiGet<CookieDto[]>("/api/products/cookie");
};

export const getCoffeeTypesApi = async (): Promise<ApiResult<string[]>> => {
  return apiGet<string[]>("/api/products/coffee/types");
};

export const getTeaTypesApi = async (): Promise<ApiResult<string[]>> => {
  return apiGet<string[]>("/api/products/tea/types");
};

export const getCakeTypesApi = async (): Promise<ApiResult<string[]>> => {
  return apiGet<string[]>("/api/products/cake/types");
};

export const getCookieTypesApi = async (): Promise<ApiResult<string[]>> => {
  return apiGet<string[]>("/api/products/cookie/types");
};
