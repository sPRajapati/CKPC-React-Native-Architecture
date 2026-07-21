# src

Feature-sliced source. App-wide layers (`api`, `store`, `navigation`, `i18n`,
`shared`, `app`) plus self-contained `features/*`. Import via `@/…`.

`api` is the secure transport boundary: token attachment, correlation IDs,
single-flight refresh, cancellation, retries, error normalization, Zod response
validation, React Query integration, and local dev mocks.
