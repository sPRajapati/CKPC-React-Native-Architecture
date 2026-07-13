import { requestNotificationPermission } from '@/shared/permissions';

export interface PushTokenProvider {
  getToken(): Promise<string | null>;
}

let provider: PushTokenProvider | null = null;

export const setPushTokenProvider = (nextProvider: PushTokenProvider | null): void => {
  provider = nextProvider;
};

export const PushNotification = {
  requestPermission: requestNotificationPermission,
  getToken: async (): Promise<string | null> => provider?.getToken() ?? null,
};
