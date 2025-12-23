import api from "./api";

export type ApiResult<T> = {
  success: boolean;
  data?: T;
  msg?: string;
  status?: number;
};

function getErrorMessage(error: any, fallback: string) {
  if (error?.response?.data?.message) return error.response.data.message;
  if (typeof error?.message === "string") return error.message;
  return fallback;
}

export async function apiGet<T>(url: string): Promise<ApiResult<T>> {
  try {
    const res = await api.get<T>(url);
    console.log('GET', url, 'response:', res);
    return { success: true, data: res.data, status: res.status };
  } catch (error: any) {
    return {
      success: false,
      msg: getErrorMessage(error, "GET request failed"),
      status: error?.response?.status,
    };
  }
}

export async function apiPost<TBody, TResponse>(
  url: string,
  body: TBody
): Promise<ApiResult<TResponse>> {
  try {
    const res = await api.post<TResponse>(url, body);
    return { success: true, data: res.data, status: res.status };
  } catch (error: any) {
    return {
      success: false,
      msg: getErrorMessage(error, "POST request failed"),
      status: error?.response?.status,
    };
  }
}

export async function apiPut<TBody, TResponse>(
  url: string,
  body: TBody
): Promise<ApiResult<TResponse>> {
  try {
    const res = await api.put<TResponse>(url, body);
    return { success: true, data: res.data, status: res.status };
  } catch (error: any) {
    return {
      success: false,
      msg: getErrorMessage(error, "PUT request failed"),
      status: error?.response?.status,
    };
  }
}

export async function apiDelete<TResponse>(
  url: string
): Promise<ApiResult<TResponse>> {
  try {
    const res = await api.delete<TResponse>(url);
    return { success: true, data: res.data, status: res.status };
  } catch (error: any) {
    return {
      success: false,
      msg: getErrorMessage(error, "DELETE request failed"),
      status: error?.response?.status,
    };
  }
}
