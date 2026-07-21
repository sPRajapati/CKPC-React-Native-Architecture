import { logger } from '@/shared/utils/logger';

const sensitiveKeys = new Set([
  'authorization',
  'cookie',
  'password',
  'token',
  'accessToken',
  'idToken',
  'refreshToken',
  'saml',
  'assertion',
]);

export const redactSensitiveData = (value: unknown): unknown => {
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
      key,
      sensitiveKeys.has(key) || sensitiveKeys.has(key.toLowerCase())
        ? '[REDACTED]'
        : entry,
    ]),
  );
};

export const safeApiLogger = {
  request: (fields: Record<string, unknown>): void => {
    logger.debug('api request', redactSensitiveData(fields));
  },
  response: (fields: Record<string, unknown>): void => {
    logger.debug('api response', redactSensitiveData(fields));
  },
  error: (fields: Record<string, unknown>): void => {
    logger.warn('api error', redactSensitiveData(fields));
  },
};
