import { AxiosError } from 'axios';
import { store } from '@/store';
import { coordinateLogout } from '@/shared/session/logoutCoordinator';
import { api } from './axios';
import { resolveDevMock } from './devMock';

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
    (error: AxiosError) => {
      // In dev with no backend, serve canned responses for known endpoints.
      const mock = resolveDevMock(error.config);
      if (mock) return mock;

      // Session expired — force logout without calling the API (avoids a loop).
      if (error.response?.status === 401) {
        void coordinateLogout({ callApi: false });
      }
      return Promise.reject(error);
    },
  );
};
