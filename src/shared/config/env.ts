type AppEnv = 'development' | 'test' | 'staging' | 'production';

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
  COGNITO_REGION: process.env.EXPO_PUBLIC_COGNITO_REGION,
  COGNITO_USER_POOL_ID: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID,
  COGNITO_CLIENT_ID: process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID,
  COGNITO_DOMAIN: process.env.EXPO_PUBLIC_COGNITO_DOMAIN,
  COGNITO_REDIRECT_URI: process.env.EXPO_PUBLIC_COGNITO_REDIRECT_URI,
  COGNITO_LOGOUT_URI: process.env.EXPO_PUBLIC_COGNITO_LOGOUT_URI,
  AUTH_SCOPES: process.env.EXPO_PUBLIC_AUTH_SCOPES ?? 'openid profile email',
  REQUEST_TIMEOUT_MS: Number(process.env.EXPO_PUBLIC_REQUEST_TIMEOUT_MS ?? 30000),
};
