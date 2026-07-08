# CKPC React Native Architecture (Expo)

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

Set `EXPO_PUBLIC_API_URL` in a `.env` file (see `.env.example`).
