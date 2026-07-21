import { apiRequest } from '@/api/request';
import { HOME_ENDPOINTS } from '@/api/endpoints';
import { REAL_API, USE_REAL_API } from '@/shared/config';
import type { ApiResponse } from '@/shared/types';
import type { FeedItem } from '../home.types';
import { feedResponseSchema, jsonPlaceholderFeedSchema } from './home.schemas';
import type { z } from 'zod';

type JsonPlaceholderFeed = z.infer<typeof jsonPlaceholderFeedSchema>;

export const fetchFeed = async (): Promise<FeedItem[]> => {
  if (USE_REAL_API) {
    const data = await apiRequest<JsonPlaceholderFeed>({
      method: 'GET',
      url: REAL_API.FEED_URL,
      metadata: {
        requiresAuth: false,
        responseSchema: jsonPlaceholderFeedSchema,
        retryPolicy: { maxRetries: 2 },
      },
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
    metadata: {
      responseSchema: feedResponseSchema,
      retryPolicy: { maxRetries: 2 },
    },
  });
  return response.data;
};
