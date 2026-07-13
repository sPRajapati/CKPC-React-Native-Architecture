import { monitoring } from '@/shared/monitoring';

export type AnalyticsProperties = Record<string, string | number | boolean | null>;

export const EventTracker = {
  track: (eventName: string, properties?: AnalyticsProperties): void => {
    monitoring.logEvent(eventName, properties);
  },
  identify: (user: { id: string; email?: string } | null): void => {
    monitoring.setUser(user);
  },
};
