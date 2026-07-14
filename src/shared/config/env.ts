type AppEnv = 'development' | 'staging' | 'production';

const appEnv = (process.env.EXPO_PUBLIC_APP_ENV ?? (__DEV__ ? 'development' : 'production')) as AppEnv;
const useRealApi = process.env.EXPO_PUBLIC_USE_REAL_API;

// Central place to read environment config. Expo exposes EXPO_PUBLIC_* vars
// on process.env at build time.
export const ENV = {
  APP_ENV: appEnv,
  API_URL: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com',
  FEED_URL:
    process.env.EXPO_PUBLIC_FEED_URL ?? 'https://jsonplaceholder.typicode.com/posts',
  USE_REAL_API: useRealApi ? useRealApi === 'true' : appEnv === 'production',
};
