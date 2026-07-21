import type { ZodType } from 'zod';
import { ApiError } from '@/api/errors/ApiError';
import { API_ERROR_CODES } from '@/api/errors/errorCodes';

export const validateResponse = <TResponse>(
  data: unknown,
  schema?: ZodType<TResponse>,
  correlationId?: string,
): TResponse => {
  if (!schema) return data as TResponse;

  const result = schema.safeParse(data);
  if (result.success) return result.data;

  throw new ApiError({
    code: API_ERROR_CODES.VALIDATION_ERROR,
    message: 'The API returned an unexpected response.',
    ...(correlationId ? { correlationId } : {}),
    details: result.error.flatten(),
    originalError: result.error,
  });
};
