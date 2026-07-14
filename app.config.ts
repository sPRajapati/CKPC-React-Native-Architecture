import { ConfigContext, ExpoConfig } from 'expo/config';

// Pick a brand at build time:  APP_BRAND=acme npx expo run:android
type BrandKey = 'cpkc' | 'acme';

const brands = {
  cpkc: {
    name: 'CPKC RN Architecture',
    slug: 'cpkc-rn-architecture',
    scheme: 'cpkcrn',
    androidPackage: 'com.cpkc.rnarchitecture',
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

const brandKey = (process.env.APP_BRAND as BrandKey) || 'cpkc';
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
