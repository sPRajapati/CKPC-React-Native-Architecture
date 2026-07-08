import { api, HOME_ENDPOINTS } from '@/api';
import type { ApiResponse } from '@/shared/types';
import type { FeedItem } from '../home.types';

export const fetchFeed = async (): Promise<FeedItem[]> => {
  const { data } = await api.get<ApiResponse<FeedItem[]>>(HOME_ENDPOINTS.FEED);
  return data.data;
};
