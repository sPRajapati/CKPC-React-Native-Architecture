import { ENV } from './env';

// In development, EXPO_PUBLIC_USE_REAL_API=false keeps the app fully demoable.
// Production env files should set it to true so hosted APIs are used.
export const USE_REAL_API = ENV.USE_REAL_API;

export const REAL_API = {
  FEED_URL: ENV.FEED_URL,
} as const;
