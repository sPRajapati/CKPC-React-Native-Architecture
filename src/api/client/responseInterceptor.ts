import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { resolveDevMock } from '@/api/devMock';
import { mapToApiError } from '@/api/errors/apiErrorMapper';
import { safeApiLogger } from '@/api/safeLogger';
import { getRetryDelayMs, shouldRetryRequest } from './retryPolicy';
import { expireSessionOnce, refreshTokenOnce } from '@/api/auth/tokenRefreshCoordinator';

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const createResponseInterceptor = (client: AxiosInstance) => ({
  fulfilled: (response: AxiosResponse): AxiosResponse => {
    const duration = response.config._requestStartedAt
      ? Date.now() - response.config._requestStartedAt
      : undefined;
    safeApiLogger.response({
      method: response.config.method,
      url: response.config.url,
      status: response.status,
      duration,
      correlationId: response.config.metadata?.correlationId,
    });
    return response;
  },

  rejected: async (error: AxiosError): Promise<AxiosResponse> => {
    const mock = resolveDevMock(error.config);
    if (mock) {
      safeApiLogger.mock({
        method: error.config?.method,
        url: error.config?.url,
        status: mock.status,
        correlationId: error.config?.metadata?.correlationId,
      });
      return mock;
    }

    const original = error.config;
    if (!original) throw mapToApiError(error);

    const status = error.response?.status;
    const shouldRefresh =
      status === 401 &&
      original.metadata?.requiresAuth !== false &&
      original.metadata?.skipAuthRefresh !== true &&
      !original._retry;

    if (shouldRefresh) {
      original._retry = true;
      safeApiLogger.refresh({
        method: original.method,
        url: original.url,
        status,
        phase: 'start',
        correlationId: original.metadata?.correlationId,
      });
      const session = await refreshTokenOnce();
      if (session?.accessToken) {
        original.headers?.set('Authorization', `Bearer ${session.accessToken}`);
        safeApiLogger.refresh({
          method: original.method,
          url: original.url,
          status,
          phase: 'success',
          correlationId: original.metadata?.correlationId,
        });
        return client(original);
      }
      safeApiLogger.refresh({
        method: original.method,
        url: original.url,
        status,
        phase: 'failed',
        correlationId: original.metadata?.correlationId,
      });
      await expireSessionOnce();
    }

    if (status !== 401 && shouldRetryRequest(error, original)) {
      original._retryCount = (original._retryCount ?? 0) + 1;
      const retryAfter = error.response?.headers?.['retry-after'];
      const retryDelayMs = getRetryDelayMs(
        original._retryCount,
        String(retryAfter ?? ''),
      );
      safeApiLogger.retry({
        method: original.method,
        url: original.url,
        status,
        retryCount: original._retryCount,
        retryDelayMs,
        correlationId: original.metadata?.correlationId,
      });
      await delay(retryDelayMs);
      return client(original);
    }

    const apiError = mapToApiError(error);
    safeApiLogger.error({
      method: original.method,
      url: original.url,
      status,
      code: apiError.code,
      correlationId: apiError.correlationId,
      retryCount: original._retryCount ?? 0,
    });
    throw apiError;
  },
});
