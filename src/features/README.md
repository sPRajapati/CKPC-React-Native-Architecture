# features

Each feature owns its screens, components, services, slice, types, and hooks:

- `auth` — login/signup/logout, session slice, persistence
- `home` — feed (React Query server state, API response validation example)
- `profile` — user profile + stats
- `settings` — theme / language / notifications toggles

Import a feature only through its `index.ts` barrel.
