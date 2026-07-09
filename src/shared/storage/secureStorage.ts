import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const webStore = (globalThis as { localStorage?: {
  getItem(k: string): string | null;
  setItem(k: string, v: string): void;
  removeItem(k: string): void;
} }).localStorage;

const isWeb = Platform.OS === 'web';

// Keychain/Keystore-backed storage for tokens (localStorage fallback on web).
export const secureStorage = {
  setItem: async (key: string, value: string): Promise<void> => {
    if (isWeb) {
      webStore?.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  getItem: async (key: string): Promise<string | null> => {
    if (isWeb) return webStore?.getItem(key) ?? null;
    return SecureStore.getItemAsync(key);
  },
  removeItem: async (key: string): Promise<void> => {
    if (isWeb) {
      webStore?.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};
