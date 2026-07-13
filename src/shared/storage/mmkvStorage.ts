import { asyncStorage } from './asyncStorage';

export const mmkvStorage = {
  getString: (key: string): Promise<string | null> => asyncStorage.getItem<string>(key),
  setString: (key: string, value: string): Promise<void> =>
    asyncStorage.setItem(key, value),
  getBoolean: async (key: string): Promise<boolean> =>
    (await asyncStorage.getItem<boolean>(key)) ?? false,
  setBoolean: (key: string, value: boolean): Promise<void> =>
    asyncStorage.setItem(key, value),
  delete: (key: string): Promise<void> => asyncStorage.removeItem(key),
};
