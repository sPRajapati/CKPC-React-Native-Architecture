import { logger } from '@/shared/utils/logger';
import { ENV } from '@/shared/config';

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

const isApiLogEnabled = (): boolean =>
  __DEV__ && ENV.APP_ENV === 'development' && process.env.NODE_ENV !== 'test';

const writeApiLog = (
  level: 'debug' | 'info' | 'warn',
  message: string,
  fields: Record<string, unknown>,
): void => {
  if (!isApiLogEnabled()) return;
  logger[level](message, redactSensitiveData(fields));
};

export const safeApiLogger = {
  request: (fields: Record<string, unknown>): void => {
    writeApiLog('debug', 'api request', fields);
  },
  response: (fields: Record<string, unknown>): void => {
    writeApiLog('debug', 'api response', fields);
  },
  retry: (fields: Record<string, unknown>): void => {
    writeApiLog('info', 'api retry', fields);
  },
  refresh: (fields: Record<string, unknown>): void => {
    writeApiLog('info', 'api auth refresh', fields);
  },
  mock: (fields: Record<string, unknown>): void => {
    writeApiLog('debug', 'api dev mock', fields);
  },
  validation: (fields: Record<string, unknown>): void => {
    writeApiLog('warn', 'api validation', fields);
  },
  error: (fields: Record<string, unknown>): void => {
    writeApiLog('warn', 'api error', fields);
  },
};
