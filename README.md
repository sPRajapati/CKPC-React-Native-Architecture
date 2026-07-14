# CPKC React Native Architecture (Expo)

An Expo app organized with a **feature-sliced architecture**, adapted for the managed
Expo workflow.

## Principles

- **Feature-first + MVVM.** Everything a feature needs (screens, ViewModel hooks,
  services, slice, types) lives under `src/features/<feature>/`. Features are
  self-contained.
- **One screen hook.** Screens call one `use<X>ViewModel` hook only. ViewModels
  compose navigation, translation, Redux/React Query hooks, form state, and actions.
- **Shared, not global.** Cross-feature building blocks live in `src/shared/`
  (components, hooks, utils, types, constants). App-wide plumbing lives in
  `src/api`, `src/store`, `src/navigation`, `src/i18n`.
- **One API entry.** Feature services call `apiRequest()` from `src/api/request.ts`.
  Axios/interceptors stay centralized.
- **State split.** Redux Toolkit holds client/app state (slices per feature).
  React Query owns server state (see `features/home`), so we don't hand-roll
  caching/loading in Redux.
- **One import style.** `@/` alias points at `src/` (tsconfig + babel
  module-resolver). Use `@/…` across features; relative paths only within a folder.

## Naming conventions

- Feature folders: `kebab-case` (`auth`, `bill-payment`).
- Logic modules: `dot.case` — `auth.slice.ts`, `auth.api.ts`, `auth.types.ts`.
- Components: `PascalCase.tsx`. Hooks: `useX.ts` (camelCase).
- No tilde (`~`) dependency ranges; use explicit caret ranges or exact versions.

## Structure

```
src/
  api/            apiRequest entry point, axios instance, endpoints, query client
  store/          configureStore + typed hooks (slices live in features)
  navigation/     RootNavigator, Auth/App navigators, navigationRef, routes
  i18n/           i18next setup + locales
  shared/         components, hooks, utils, types, constants, config
  features/
    auth/         view models, auth.slice, auth.types, services/auth.api, screens
    home/         view model, home.api, hooks/useHomeData (React Query), screens
```

## Review checklist updates

- **Husky commit checks:** pre-commit runs `yarn typecheck` and a staged secret
  scan for private keys, auth keys, API keys, secrets, and tokens. Commit messages
  run Commitlint.
- **Atomic design:** atoms/molecules/organisms/templates stay in their matching
  folders. Reusable loader behavior lives in `shared/hoc/withLoader.tsx`.
- **React 18+ patterns:** keep render logic pure, rely on automatic batching, and
  use concurrent helpers such as `useTransition`/`useDeferredValue` only when a
  screen has measurable interaction pressure.
- **Testing:** see `docs/TESTING_STRATEGY.md` for BDD, TDD, Jest, and snapshot
  testing rules.
- **Fastlane:** see `docs/FASTLANE.md` for planned CI/CD release lanes.
- **Tabs:** bottom tabs define explicit label typography in
  `BottomTabNavigator.tsx`.
- **Responsive sizing:** use `rpx()` for left/right spacing, padding, margins,
  radius, component sizes, and font sizes so iPhone and iPad layouts scale
  consistently.

## Getting started

```
yarn install
yarn start      # then press i / a, or scan with Expo Go dev build
```

## Scripts

| Command | Use |
| --- | --- |
| `yarn install` | Install dependencies from `yarn.lock`. |
| `yarn start` | Start Expo Metro for local development. |
| `yarn android` | Run the app on Android using Expo native run. |
| `yarn ios` | Run the app on iOS using Expo native run. |
| `yarn web` | Start the Expo web build. |
| `yarn typecheck` | Run TypeScript without emitting files. |
| `yarn lint` | Run ESLint across JS/TS/TSX files. |
| `yarn test` | Run the Jest test suite. |
| `yarn test --runInBand --watchman=false` | Run Jest locally without Watchman. Useful if Watchman has permission issues. |
| `yarn test:watch` | Run Jest in watch mode while developing. |
| `yarn test:coverage` | Generate Jest coverage. |
| `yarn secret-scan` | Scan staged files for private keys, auth keys, API keys, secrets, and tokens. |
| `yarn build:brand` | Prebuild and run both iOS and Android for the selected `APP_BRAND`. |
| `yarn build:brand:ios` | Prebuild and run iOS for the selected `APP_BRAND`. |
| `yarn build:brand:android` | Prebuild and run Android for the selected `APP_BRAND`. |
| `yarn prepare` | Install Husky Git hooks. Usually runs automatically after install. |

Before committing, run:

```
yarn typecheck
yarn lint
yarn test --runInBand --watchman=false
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

1. `yarn add react-native-ssl-public-key-pinning`
2. add `"react-native-ssl-public-key-pinning"` to `plugins` in `app.json`
3. `yarn expo prebuild` and `yarn expo run:android` (native module — not Expo Go)
4. fill `PINNED_HOSTS` with your host + SPKI SHA-256 hashes (include a backup pin)

See the file header for the `openssl` command that generates the hashes.
