import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './locales/en.json';
import es from './locales/es.json';

const SUPPORTED = ['en', 'es'] as const;
type Supported = (typeof SUPPORTED)[number];

const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';
const initialLanguage: Supported = SUPPORTED.includes(deviceLanguage as Supported)
  ? (deviceLanguage as Supported)
  : 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  supportedLngs: SUPPORTED,
  interpolation: { escapeValue: false },
});

export default i18n;
