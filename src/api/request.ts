import type { AxiosRequestConfig, Method } from 'axios';

import { api } from './axios';

interface ApiRequestConfig<TBody> extends Omit<AxiosRequestConfig<TBody>, 'url' | 'method' | 'data'> {
  method: Method;
  url: string;
  data?: TBody;
}

export const apiRequest = async <TResponse, TBody = unknown>({
  method,
  url,
  data,
  ...config
}: ApiRequestConfig<TBody>): Promise<TResponse> => {
  const response = await api.request<TResponse>({
    method,
    url,
    data,
    ...config,
  });

  return response.data;
};
