import { useQuery } from '@tanstack/react-query';
import { fetchFeed } from '../services';

// Server state lives in React Query, not Redux — no manual loading/cache wiring.
export const useHomeData = () =>
  useQuery({
    queryKey: ['home', 'feed'],
    queryFn: fetchFeed,
  });
