// Simple compile-time flags. Swap for a remote-config source later if needed.
export const featureFlags = {
  enableSignup: true,
  enableDarkMode: true,
  enableAnalytics: false,
} as const;

export type FeatureFlag = keyof typeof featureFlags;

export const isFeatureEnabled = (flag: FeatureFlag): boolean => featureFlags[flag];
