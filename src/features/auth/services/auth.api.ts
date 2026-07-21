import { apiRequest } from '@/api/request';
import { AUTH_ENDPOINTS } from '@/api/endpoints';
import type { ApiResponse } from '@/shared/types';
import type { AuthData, LoginPayload, SignupPayload } from '../auth.types';

export const login = (payload: LoginPayload) =>
  apiRequest<ApiResponse<AuthData>, LoginPayload>({
    method: 'POST',
    url: AUTH_ENDPOINTS.LOGIN,
    data: payload,
    metadata: { requiresAuth: false, skipAuthRefresh: true },
  });

export const signup = (payload: SignupPayload) =>
  apiRequest<ApiResponse<AuthData>, SignupPayload>({
    method: 'POST',
    url: AUTH_ENDPOINTS.SIGNUP,
    data: payload,
    metadata: { requiresAuth: false, skipAuthRefresh: true },
  });

export const logout = () =>
  apiRequest<ApiResponse<{ message: string }>>({
    method: 'POST',
    url: AUTH_ENDPOINTS.LOGOUT,
    metadata: { skipAuthRefresh: true },
  });

export const refresh = (refreshToken: string) =>
  apiRequest<ApiResponse<AuthData>, { refreshToken: string }>({
    method: 'POST',
    url: AUTH_ENDPOINTS.REFRESH,
    data: { refreshToken },
    metadata: { requiresAuth: false, skipAuthRefresh: true },
  });
