import { apiRequest } from '@/api';
import { HOME_ENDPOINTS } from '@/api/endpoints';
import { REAL_API, USE_REAL_API } from '@/shared/config';
import type { ApiResponse } from '@/shared/types';
import type { FeedItem } from '../home.types';

interface JsonPlaceholderPost {
  id: number;
  title: string;
  body: string;
}

export const fetchFeed = async (): Promise<FeedItem[]> => {
  if (USE_REAL_API) {
    const data = await apiRequest<JsonPlaceholderPost[]>({
      method: 'GET',
      url: REAL_API.FEED_URL,
    });
    return data.slice(0, 15).map((post) => ({
      id: String(post.id),
      title: post.title,
      subtitle: post.body.replace(/\n/g, ' '),
    }));
  }
  const response = await apiRequest<ApiResponse<FeedItem[]>>({
    method: 'GET',
    url: HOME_ENDPOINTS.FEED,
  });
  return response.data;
};
