import Constants from 'expo-constants';

export interface BrandConfig {
  key: string;
  name: string;
  primaryColor: string;
}

const fallback: BrandConfig = {
  key: 'ckpc',
  name: 'CKPC RN Architecture',
  primaryColor: '#4C1D95',
};

export const brandConfig: BrandConfig =
  (Constants.expoConfig?.extra?.brand as BrandConfig | undefined) ?? fallback;
