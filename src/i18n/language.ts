import { storageUtils } from '@/shared/storage';
import i18n from './index';

export const SUPPORTED_LANGUAGES = ['en', 'es', 'hi', 'te'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

const isSupported = (lng: string): lng is Language =>
  (SUPPORTED_LANGUAGES as readonly string[]).includes(lng);

/** Change language and persist the choice. */
export const setLanguage = async (lng: Language): Promise<void> => {
  await i18n.changeLanguage(lng);
  await storageUtils.saveLanguage(lng);
};

/** Restore a persisted language on startup (falls back to device/init). */
export const restoreLanguage = async (): Promise<void> => {
  const stored = await storageUtils.getLanguage();
  if (stored && isSupported(stored)) {
    await i18n.changeLanguage(stored);
  }
};
