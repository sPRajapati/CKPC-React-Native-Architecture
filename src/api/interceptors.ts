import { AxiosError } from 'axios';
import { store } from '@/store';
import { clearAuth } from '@/features/auth/auth.slice';
import { navigationRef } from '@/navigation/RootNavigation';
import { APP_ROUTES } from '@/navigation/routes';
import { api } from './axios';
import { resolveDevMock } from './devMock';

let installed = false;

/**
 * Attaches auth token + 401 handling. Called once at app start (after the store
 * exists), so `api` doesn't have to import the store at module load — which is
 * what previously created the require cycle.
 */
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

      if (error.response?.status === 401) {
        store.dispatch(clearAuth());
        const current = navigationRef.current?.getCurrentRoute()?.name;
        if (current !== APP_ROUTES.LOGIN) {
          navigationRef.current?.reset({
            index: 0,
            routes: [{ name: APP_ROUTES.LOGIN }],
          });
        }
      }
      return Promise.reject(error);
    },
  );
};
