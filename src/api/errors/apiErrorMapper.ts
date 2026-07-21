import { AxiosError, isAxiosError, isCancel } from 'axios';
import { ApiError } from './ApiError';
import { API_ERROR_CODES } from './errorCodes';

const retryableStatuses = new Set([408, 429, 502, 503, 504]);

const getCorrelationId = (error: AxiosError): string | undefined => {
  const responseHeader = error.response?.headers?.['x-correlation-id'];
  if (typeof responseHeader === 'string') return responseHeader;
  return error.config?.metadata?.correlationId;
};

const isTimeout = (error: AxiosError): boolean =>
  error.code === AxiosError.ETIMEDOUT || error.code === 'ECONNABORTED';

export const mapToApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error;

  if (!isAxiosError(error)) {
    return new ApiError({
      code: API_ERROR_CODES.UNKNOWN_ERROR,
      message: 'Something went wrong. Please try again.',
      originalError: error,
    });
  }

  if (isCancel(error) || error.code === AxiosError.ERR_CANCELED) {
    return new ApiError({
      code: API_ERROR_CODES.REQUEST_CANCELLED,
      message: 'Request was cancelled.',
      correlationId: getCorrelationId(error),
      originalError: error,
    });
  }

  if (isTimeout(error)) {
    return new ApiError({
      code: API_ERROR_CODES.REQUEST_TIMEOUT,
      message: 'The request timed out. Please try again.',
      correlationId: getCorrelationId(error),
      isRetryable: true,
      originalError: error,
    });
  }

  if (!error.response) {
    return new ApiError({
      code: API_ERROR_CODES.NETWORK_ERROR,
      message: 'Network connection is unavailable.',
      correlationId: getCorrelationId(error),
      isRetryable: true,
      originalError: error,
    });
  }

  const status = error.response.status;
  const correlationId = getCorrelationId(error);

  if (status === 400 || status === 422) {
    return new ApiError({
      code: API_ERROR_CODES.VALIDATION_ERROR,
      message: 'The request could not be processed.',
      status,
      correlationId,
      details: error.response.data,
      originalError: error,
    });
  }

  if (status === 401) {
    return new ApiError({
      code: API_ERROR_CODES.AUTH_SESSION_EXPIRED,
      message: 'Your session has expired. Please sign in again.',
      status,
      correlationId,
      originalError: error,
    });
  }

  if (status === 403) {
    return new ApiError({
      code: API_ERROR_CODES.FORBIDDEN,
      message: 'You do not have permission to perform this action.',
      status,
      correlationId,
      originalError: error,
    });
  }

  if (status === 404) {
    return new ApiError({
      code: API_ERROR_CODES.NOT_FOUND,
      message: 'The requested resource was not found.',
      status,
      correlationId,
      originalError: error,
    });
  }

  if (status === 409) {
    return new ApiError({
      code: API_ERROR_CODES.CONFLICT,
      message: 'The request conflicts with the current state.',
      status,
      correlationId,
      originalError: error,
    });
  }

  if (status === 429) {
    return new ApiError({
      code: API_ERROR_CODES.RATE_LIMITED,
      message: 'Too many requests. Please try again later.',
      status,
      correlationId,
      isRetryable: true,
      originalError: error,
    });
  }

  if (retryableStatuses.has(status)) {
    return new ApiError({
      code: API_ERROR_CODES.SERVICE_UNAVAILABLE,
      message: 'The service is temporarily unavailable.',
      status,
      correlationId,
      isRetryable: true,
      originalError: error,
    });
  }

  if (status >= 500) {
    return new ApiError({
      code: API_ERROR_CODES.SERVER_ERROR,
      message: 'The server could not complete the request.',
      status,
      correlationId,
      isRetryable: false,
      originalError: error,
    });
  }

  return new ApiError({
    code: API_ERROR_CODES.UNKNOWN_ERROR,
    message: 'Something went wrong. Please try again.',
    status,
    correlationId,
    originalError: error,
  });
};
