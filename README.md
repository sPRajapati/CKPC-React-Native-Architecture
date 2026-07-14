# CPKC React Native Architecture (Expo)

An Expo app organized with a **feature-sliced architecture**, adapted for the managed
Expo workflow.

## Principles

- **Feature-first.** Everything a feature needs (screens, components, services,
  slice, types) lives under `src/features/<feature>/`. Features are self-contained.
- **Shared, not global.** Cross-feature building blocks live in `src/shared/`
  (components, hooks, utils, types, constants). App-wide plumbing lives in
  `src/api`, `src/store`, `src/navigation`, `src/i18n`.
- **State split.** Redux Toolkit holds client/app state (slices per feature).
  React Query owns server state (see `features/home`), so we don't hand-roll
  caching/loading in Redux.
- **One import style.** `@/` alias points at `src/` (tsconfig + babel
  module-resolver). Use `@/…` across features; relative paths only within a folder.

## Naming conventions

- Feature folders: `kebab-case` (`auth`, `bill-payment`).
- Logic modules: `dot.case` — `auth.slice.ts`, `auth.api.ts`, `auth.types.ts`.
- Components: `PascalCase.tsx`. Hooks: `useX.ts` (camelCase).

## Structure

```
src/
  api/            axios instance, endpoints, react-query client
  store/          configureStore + typed hooks (slices live in features)
  navigation/     RootNavigator, Auth/App navigators, navigationRef, routes
  i18n/           i18next setup + locales
  shared/         components, hooks, utils, types, constants, config
  features/
    auth/         auth.slice, auth.types, services/auth.api, screens, components
    home/         home.api, hooks/useHomeData (React Query), screens
```

## Getting started

```
npm install
npm run start      # then press i / a, or scan with Expo Go dev build
```

Copy `.env.example` to `.env` for local development. The checked-in example uses
offline CPKC mock data by default:

```
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_USE_REAL_API=false
```

Use `.env.production.example` as the production template and set the real CPKC API
host before building a release. Production should keep `EXPO_PUBLIC_USE_REAL_API=true`.

## Localization

`src/i18n` uses i18next with **English (`en`)** and **Spanish (`es`)**. The device
language is auto-detected and falls back to English. Add a language by dropping a
`locales/<lng>.json` file and registering it in `src/i18n/index.ts`.

## Security — SSL pinning

SSL public-key pinning is scaffolded in `src/shared/security/sslPinning.ts` but
**disabled by default** (empty pin list = no-op), so the app runs without any
native module. To turn it on once you have your API certificate:

1. `npm install react-native-ssl-public-key-pinning --legacy-peer-deps`
2. add `"react-native-ssl-public-key-pinning"` to `plugins` in `app.json`
3. `npx expo prebuild && npx expo run:android` (native module — not Expo Go)
4. fill `PINNED_HOSTS` with your host + SPKI SHA-256 hashes (include a backup pin)

See the file header for the `openssl` command that generates the hashes.


