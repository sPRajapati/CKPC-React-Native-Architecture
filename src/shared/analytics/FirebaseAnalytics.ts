import type { AnalyticsProperties } from './EventTracker';

export interface FirebaseAnalyticsClient {
  logEvent(name: string, properties?: AnalyticsProperties): Promise<void> | void;
  setUserId(userId: string | null): Promise<void> | void;
}

let client: FirebaseAnalyticsClient | null = null;

export const setFirebaseAnalyticsClient = (
  nextClient: FirebaseAnalyticsClient | null,
): void => {
  client = nextClient;
};

export const FirebaseAnalytics = {
  logEvent: async (name: string, properties?: AnalyticsProperties): Promise<void> => {
    await client?.logEvent(name, properties);
  },
  setUserId: async (userId: string | null): Promise<void> => {
    await client?.setUserId(userId);
  },
};
