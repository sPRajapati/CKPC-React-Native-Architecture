import type { ZodType } from 'zod';

export type RetryPolicy = {
  maxRetries?: number;
  retryUnsafeMethods?: boolean;
};

export type ApiRequestMetadata<TResponse = unknown> = {
  requiresAuth?: boolean;
  skipAuthRefresh?: boolean;
  responseSchema?: ZodType<TResponse>;
  retryPolicy?: RetryPolicy;
  requestId?: string;
  correlationId?: string;
};

declare module 'axios' {
  export interface AxiosRequestConfig {
    metadata?: ApiRequestMetadata | undefined;
    _retry?: boolean;
    _retryCount?: number;
    _requestStartedAt?: number;
  }

  export interface InternalAxiosRequestConfig {
    metadata?: ApiRequestMetadata | undefined;
    _retry?: boolean;
    _retryCount?: number;
    _requestStartedAt?: number;
  }
}
