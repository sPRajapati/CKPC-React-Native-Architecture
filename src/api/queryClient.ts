import { QueryCache, QueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@/shared/utils';
import { showToast } from '@/shared/feedback';
import { monitoring } from '@/shared/monitoring';
import { cancelActiveApiRequests } from './client/requestCancellation';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      monitoring.captureError(error, { source: 'query' });
      showToast(getErrorMessage(error), 'error');
    },
  }),
  defaultOptions: {
    queries: { retry: false, staleTime: 30_000, gcTime: 5 * 60_000, refetchOnWindowFocus: false },
  },
});

export const clearUserQueryData = async (): Promise<void> => {
  cancelActiveApiRequests();
  await queryClient.cancelQueries();
  queryClient.removeQueries({ predicate: (query) => query.meta?.scope !== 'public' });
};
