export interface RemoteMessage {
  messageId?: string;
  title?: string;
  body?: string;
  data?: Record<string, string>;
}

type MessageHandler = (message: RemoteMessage) => void;

const handlers = new Set<MessageHandler>();

export const FirebaseMessaging = {
  onMessage: (handler: MessageHandler): (() => void) => {
    handlers.add(handler);
    return () => handlers.delete(handler);
  },
  emitMessage: (message: RemoteMessage): void => {
    handlers.forEach((handler) => handler(message));
  },
};
