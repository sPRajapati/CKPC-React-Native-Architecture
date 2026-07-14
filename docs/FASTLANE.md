# Fastlane CI/CD

Fastlane is the planned native release automation layer for CI/CD.

Recommended lanes:

- `ios beta` — build and upload an iOS beta through TestFlight.
- `android beta` — build and upload an Android internal test release.
- `ios release` / `android release` — production release lanes after signing,
  certificates, and store metadata are approved.

Secrets such as API keys, auth keys, private keys, Apple issuer IDs, and service
account JSON must stay in the CI secret store. They must never be committed to
the repo.
