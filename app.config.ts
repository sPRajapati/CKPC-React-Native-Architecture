import { ConfigContext, ExpoConfig } from 'expo/config';

// Pick a brand at build time:  APP_BRAND=acme npx expo run:android
type BrandKey = 'ckpc' | 'acme';

const brands = {
  ckpc: {
    name: 'CKPC RN Architecture',
    slug: 'ckpc-rn-architecture',
    scheme: 'ckpcrn',
    androidPackage: 'com.ckpc.rnarchitecture',
    primaryColor: '#4C1D95',
  },
  acme: {
    name: 'Acme App',
    slug: 'acme-app',
    scheme: 'acme',
    androidPackage: 'com.acme.app',
    primaryColor: '#0EA5E9',
  },
} as const;

const brandKey = (process.env.APP_BRAND as BrandKey) || 'ckpc';
const brand = brands[brandKey];

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: brand.name,
  slug: brand.slug,
  scheme: brand.scheme,
  android: { ...config.android, package: brand.androidPackage },
  // Exposed to the app at runtime via expo-constants (see shared/config/brandConfig).
  extra: {
    ...config.extra,
    brand: { key: brandKey, name: brand.name, primaryColor: brand.primaryColor },
  },
  plugins: ['expo-localization', 'expo-secure-store'],
});
