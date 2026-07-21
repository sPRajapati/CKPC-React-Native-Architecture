import type { AxiosRequestConfig, Method } from 'axios';

import { api } from './axios';
import {
  createAbortController,
  unregisterAbortController,
} from './client/requestCancellation';
import { validateResponse } from './validation/validateResponse';
import type { ApiRequestMetadata } from './types';

interface ApiRequestConfig<TResponse, TBody>
  extends Omit<AxiosRequestConfig<TBody>, 'url' | 'method' | 'data'> {
  method: Method;
  url: string;
  data?: TBody;
  metadata?: ApiRequestMetadata<TResponse>;
}

export const apiRequest = async <TResponse, TBody = unknown>({
  method,
  url,
  data,
  metadata,
  ...config
}: ApiRequestConfig<TResponse, TBody>): Promise<TResponse> => {
  const requestConfig: AxiosRequestConfig<TBody> = {
    method,
    url,
    ...config,
  };
  if (data !== undefined) requestConfig.data = data;
  if (metadata) requestConfig.metadata = metadata;
  const controller = requestConfig.signal ? null : createAbortController();
  if (controller) requestConfig.signal = controller.signal;

  try {
    const response = await api.request<TResponse>(requestConfig);

    return validateResponse<TResponse>(
      response.data,
      metadata?.responseSchema,
      response.config.metadata?.correlationId,
    );
  } finally {
    if (controller) unregisterAbortController(controller);
  }
};
