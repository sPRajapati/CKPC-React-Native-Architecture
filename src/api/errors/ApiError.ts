import type { ApiErrorCode } from './errorCodes';

export interface ApiErrorOptions {
  code: ApiErrorCode;
  message: string;
  status?: number | undefined;
  correlationId?: string | undefined;
  details?: unknown;
  fieldErrors?: Record<string, string[]> | undefined;
  isRetryable?: boolean;
  originalError?: unknown;
}

export class ApiError extends Error {
  code: ApiErrorCode;
  status?: number | undefined;
  correlationId?: string | undefined;
  details?: unknown;
  fieldErrors?: Record<string, string[]> | undefined;
  isRetryable: boolean;
  originalError?: unknown;
  timestamp: string;

  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.name = 'ApiError';
    this.code = options.code;
    this.status = options.status;
    this.correlationId = options.correlationId;
    this.details = options.details;
    this.fieldErrors = options.fieldErrors;
    this.isRetryable = options.isRetryable ?? false;
    this.originalError = options.originalError;
    this.timestamp = new Date().toISOString();
  }
}
