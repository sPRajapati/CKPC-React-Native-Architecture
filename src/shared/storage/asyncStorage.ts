import AsyncStorage from '@react-native-async-storage/async-storage';

// JSON-serializing wrapper for non-sensitive data.
export const asyncStorage = {
  setItem: async <T>(key: string, value: T): Promise<void> => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  getItem: async <T>(key: string): Promise<T | null> => {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  },
  removeItem: (key: string): Promise<void> => AsyncStorage.removeItem(key),
  clear: (): Promise<void> => AsyncStorage.clear(),
};
