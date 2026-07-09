import { api } from '@/api/axios';
import { AUTH_ENDPOINTS } from '@/api/endpoints';
import type { ApiResponse } from '@/shared/types';
import type { AuthData, LoginPayload, SignupPayload } from '../auth.types';

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post<ApiResponse<AuthData>>(AUTH_ENDPOINTS.LOGIN, payload);
  return data;
};

export const signup = async (payload: SignupPayload) => {
  const { data } = await api.post<ApiResponse<AuthData>>(AUTH_ENDPOINTS.SIGNUP, payload);
  return data;
};

export const logout = async () => {
  const { data } = await api.post<ApiResponse<{ message: string }>>(AUTH_ENDPOINTS.LOGOUT);
  return data;
};

export const refresh = async (refreshToken: string) => {
  const { data } = await api.post<ApiResponse<AuthData>>(AUTH_ENDPOINTS.REFRESH, {
    refreshToken,
  });
  return data;
};
