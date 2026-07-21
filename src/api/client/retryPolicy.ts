import type { AxiosError, AxiosRequestConfig } from 'axios';

const retryableStatuses = new Set([408, 429, 502, 503, 504]);
const idempotentMethods = new Set(['GET', 'HEAD', 'OPTIONS']);

const parseRetryAfterMs = (retryAfter?: string): number | undefined => {
  if (!retryAfter) return undefined;
  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds)) return seconds * 1000;
  const date = Date.parse(retryAfter);
  return Number.isNaN(date) ? undefined : Math.max(date - Date.now(), 0);
};

export const getRetryDelayMs = (
  retryCount: number,
  retryAfter?: string,
): number => {
  const retryAfterMs = parseRetryAfterMs(retryAfter);
  if (retryAfterMs !== undefined) return retryAfterMs;
  const baseDelay = 300 * 2 ** retryCount;
  const jitter = Math.trunc(Math.random() * 150);
  return Math.min(baseDelay + jitter, 3000);
};

export const shouldRetryRequest = (
  error: AxiosError,
  config: AxiosRequestConfig,
): boolean => {
  const retryCount = config._retryCount ?? 0;
  const maxRetries = config.metadata?.retryPolicy?.maxRetries ?? 2;
  if (retryCount >= maxRetries) return false;

  const method = (config.method ?? 'GET').toUpperCase();
  const canRetryMethod =
    idempotentMethods.has(method) || config.metadata?.retryPolicy?.retryUnsafeMethods === true;
  if (!canRetryMethod) return false;

  if (!error.response) return true;
  return retryableStatuses.has(error.response.status);
};
