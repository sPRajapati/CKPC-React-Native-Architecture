import { z } from 'zod';
import { apiResponseSchema } from '@/api/validation/commonSchemas';

export const feedItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
});

export const feedResponseSchema = apiResponseSchema(z.array(feedItemSchema));

export const jsonPlaceholderPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const jsonPlaceholderFeedSchema = z.array(jsonPlaceholderPostSchema);
