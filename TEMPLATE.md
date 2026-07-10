# Template Usage Guide

This repository is structured to act as a reusable React Native boilerplate.

## Create a new app from this template

### Option 1: Use GitHub template

1. Mark this repository as a template in GitHub repository settings.
2. Click **Use this template** to create a new repository.
3. Clone the new repository:

```bash
git clone https://github.com/<your-org>/<your-new-app>.git
cd <your-new-app>
npm install
```

### Option 2: Clone directly and rename

```bash
git clone https://github.com/<your-org>/rn-architecture-app.git my-new-app
cd my-new-app
npm install
```

Then update the app metadata.

## Rename the app

1. Open `package.json` and update:
   - `name`
   - `version` if desired

2. Open `app.json` and update the `expo` fields:
   - `name`
   - `slug`
   - `version`
   - `icon`
   - `web.favicon`

3. Optionally replace `assets/icon.png` and `assets/favicon.png` with your own branding.

## Use a specific React Native version

This boilerplate is built for Expo SDK 56 with React Native `0.85.3`.

To use a different React Native version:

1. Choose a compatible Expo SDK version for the React Native release you want.
2. Update `package.json`:
   - `expo`
   - `react-native`
   - any Expo-related dependencies to versions that match the chosen SDK
3. Run `npm install` and then `npx expo doctor` to verify compatibility.

> If you need a non-Expo React Native version, you can use the architecture and folder structure from this template in a bare React Native app, but you will need to replace Expo-specific modules.

## Customize and run

```bash
npm install
npm start
```

Then use `i`, `a`, or scan the QR code with Expo Go.

## Recommended project cleanup after cloning

- Remove sample screens or replace them with your app flow
- Update localization strings and translations
- Configure API URLs, analytics, and notification services
- Adjust feature flags and environment variables

## Notes for other users

- Anyone with access to this repository can reuse it as a boilerplate.
- The app name and metadata are fully customizable after cloning.
- Keep `private: true` in `package.json` if you do not intend to publish to npm.
