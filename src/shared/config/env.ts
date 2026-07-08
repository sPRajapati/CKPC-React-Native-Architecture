// Central place to read environment config. Expo exposes EXPO_PUBLIC_* vars
// on process.env at build time.
export const ENV = {
  API_URL: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com',
};
