# shared

Cross-feature building blocks (no feature-specific logic):

- `components` — atomic-design UI (atoms/molecules/organisms/templates)
- `utils/responsive.ts` — `rpx()` for spacing, sizes, and typography across
  iPhone/iPad layouts
- `theme` — light/dark ThemeProvider + `useTheme`
- `storage` — SecureStore/AsyncStorage wrappers + `storageUtils`
- `config` — env, feature flags, brand config
- `hooks` — `useNetwork`
- `session` — logout coordinator
- `permissions` — camera/location/notification helpers (optional deps)
- `security` — SSL pinning scaffold
- `types`, `utils`, `constants`
