import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { store } from '@/store';
import { refreshSession } from '@/features/auth/refreshSession';
import { coordinateLogout } from '@/shared/session/logoutCoordinator';
import { api } from './axios';
import { resolveDevMock } from './devMock';

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let installed = false;

export const setupInterceptors = () => {
  if (installed) return;
  installed = true;

  api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      // In dev with no backend, serve canned responses for known endpoints.
      const mock = resolveDevMock(error.config);
      if (mock) return mock;

      const original = error.config as RetriableConfig | undefined;

      // On 401, try a single silent refresh + retry before forcing logout.
      if (error.response?.status === 401 && original && !original._retry) {
        original._retry = true;
        const newToken = await refreshSession();
        if (newToken) {
          original.headers.Authorization = `Bearer ${newToken}`;
          return api(original);
        }
        await coordinateLogout({ callApi: false });
      }

      return Promise.reject(error);
    },
  );
};
