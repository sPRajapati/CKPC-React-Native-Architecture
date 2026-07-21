import { ApiError } from './ApiError';

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;
