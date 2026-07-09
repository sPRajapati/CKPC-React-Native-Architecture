// The Home feed uses a real hosted API; auth uses the local __DEV__ mock.
// Set EXPO_PUBLIC_USE_REAL_API=false to also mock the feed.
export const USE_REAL_API =
  (process.env.EXPO_PUBLIC_USE_REAL_API ?? 'true') !== 'false';

export const REAL_API = {
  FEED_URL: 'https://jsonplaceholder.typicode.com/posts',
} as const;
