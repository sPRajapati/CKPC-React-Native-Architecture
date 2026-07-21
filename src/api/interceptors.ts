import { api } from './axios';
import { requestInterceptor } from './client/requestInterceptor';
import { createResponseInterceptor } from './client/responseInterceptor';

let installed = false;

export const setupInterceptors = () => {
  if (installed) return;
  installed = true;

  api.interceptors.request.use(requestInterceptor);
  const responseInterceptor = createResponseInterceptor(api);
  api.interceptors.response.use(responseInterceptor.fulfilled, responseInterceptor.rejected);
};
