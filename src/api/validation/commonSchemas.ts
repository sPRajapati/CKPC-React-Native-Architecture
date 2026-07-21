import { z } from 'zod';

export const apiResponseSchema = <TData extends z.ZodType>(data: TData) =>
  z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data,
  });
