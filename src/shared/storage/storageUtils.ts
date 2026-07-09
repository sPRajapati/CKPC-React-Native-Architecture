import type { User } from '@/shared/types';
import { asyncStorage } from './asyncStorage';
import { secureStorage } from './secureStorage';
import { StorageKeys } from './storageKeys';

// Token in SecureStore; user/prefs in AsyncStorage. Single place for keys.
export const storageUtils = {
  saveAuthToken: (token: string) => secureStorage.setItem(StorageKeys.AUTH_TOKEN, token),
  getAuthToken: () => secureStorage.getItem(StorageKeys.AUTH_TOKEN),

  saveRefreshToken: (token: string) =>
    secureStorage.setItem(StorageKeys.REFRESH_TOKEN, token),
  getRefreshToken: () => secureStorage.getItem(StorageKeys.REFRESH_TOKEN),

  saveUser: (user: User) => asyncStorage.setItem(StorageKeys.USER_DATA, user),
  getUser: () => asyncStorage.getItem<User>(StorageKeys.USER_DATA),

  saveThemeMode: (mode: string) => asyncStorage.setItem(StorageKeys.THEME_MODE, mode),
  getThemeMode: () => asyncStorage.getItem<string>(StorageKeys.THEME_MODE),

  saveLanguage: (lng: string) => asyncStorage.setItem(StorageKeys.LANGUAGE, lng),
  getLanguage: () => asyncStorage.getItem<string>(StorageKeys.LANGUAGE),

  clearAuthData: async (): Promise<void> => {
    await asyncStorage.removeItem(StorageKeys.USER_DATA);
    await secureStorage.removeItem(StorageKeys.AUTH_TOKEN);
    await secureStorage.removeItem(StorageKeys.REFRESH_TOKEN);
  },
};
