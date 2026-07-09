import { QueryCache, QueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@/shared/utils';
import { showToast } from '@/shared/feedback';
import { monitoring } from '@/shared/monitoring';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      monitoring.captureError(error, { source: 'query' });
      showToast(getErrorMessage(error), 'error');
    },
  }),
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000, refetchOnWindowFocus: false },
  },
});
