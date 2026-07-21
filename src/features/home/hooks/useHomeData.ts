import { useQuery } from '@tanstack/react-query';
import { fetchFeed } from '../services';
import { homeQueryKeys } from './homeQueryKeys';

// Server state lives in React Query, not Redux — no manual loading/cache wiring.
export const useHomeData = () =>
  useQuery({
    queryKey: homeQueryKeys.feed(),
    queryFn: fetchFeed,
  });
