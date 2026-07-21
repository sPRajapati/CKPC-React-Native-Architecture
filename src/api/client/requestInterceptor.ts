import NetInfo from '@react-native-community/netinfo';
import type { InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '@/api/errors/ApiError';
import { API_ERROR_CODES } from '@/api/errors/errorCodes';
import { createRequestHeaders } from '@/api/headers/createRequestHeaders';
import { safeApiLogger } from '@/api/safeLogger';
import { tokenManager } from '@/api/auth/tokenManager';

const publicRequest = (config: InternalAxiosRequestConfig): boolean =>
  config.metadata?.requiresAuth === false;

export const requestInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const netState = await NetInfo.fetch();
  if (netState.isConnected === false) {
    throw new ApiError({
      code: API_ERROR_CODES.NETWORK_ERROR,
      message: 'Network connection is unavailable.',
      ...(config.metadata?.correlationId
        ? { correlationId: config.metadata.correlationId }
        : {}),
      isRetryable: true,
    });
  }

  const correlationId = config.metadata?.correlationId;
  const headers = createRequestHeaders(correlationId);
  const nextCorrelationId = headers['X-Correlation-ID'] ?? correlationId ?? '';
  config.metadata = { ...(config.metadata ?? {}), correlationId: nextCorrelationId };
  config.headers.set(headers);
  config._requestStartedAt = Date.now();

  if (!publicRequest(config)) {
    const accessToken = await tokenManager.getAccessToken();
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  safeApiLogger.request({
    method: config.method,
    url: config.url,
    correlationId: nextCorrelationId,
  });

  return config;
};
