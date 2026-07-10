import type { RemoteMessage } from './FirebaseMessaging';

type NotificationListener = (message: RemoteMessage) => void;

const listeners = new Set<NotificationListener>();

export const NotificationHandler = {
  register: (listener: NotificationListener): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  handleForegroundMessage: (message: RemoteMessage): void => {
    listeners.forEach((listener) => listener(message));
  },
};
