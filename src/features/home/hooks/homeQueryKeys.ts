export const homeQueryKeys = {
  all: ['home'] as const,
  feed: () => [...homeQueryKeys.all, 'feed'] as const,
};
