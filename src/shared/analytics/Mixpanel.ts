import type { AnalyticsProperties } from './EventTracker';

export interface MixpanelClient {
  track(eventName: string, properties?: AnalyticsProperties): void;
  identify(userId: string): void;
  reset(): void;
}

let client: MixpanelClient | null = null;

export const setMixpanelClient = (nextClient: MixpanelClient | null): void => {
  client = nextClient;
};

export const Mixpanel = {
  track: (eventName: string, properties?: AnalyticsProperties): void => {
    client?.track(eventName, properties);
  },
  identify: (userId: string): void => {
    client?.identify(userId);
  },
  reset: (): void => {
    client?.reset();
  },
};
