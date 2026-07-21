# i18n

i18next with English + Spanish. Device language is detected with an English
fallback. `language.ts` exposes `setLanguage` (persists) and `restoreLanguage`
(called at startup).

React Native runtimes may not provide `Intl.PluralRules`, which i18next uses for
pluralization. `index.ts` imports `intl-pluralrules` before i18next initialization
so plural handling stays consistent and the runtime fallback warning is avoided.
