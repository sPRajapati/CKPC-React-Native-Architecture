export type ToastType = 'info' | 'success' | 'error';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

type Listener = (toast: ToastMessage) => void;

let listeners: Listener[] = [];
let counter = 0;

export const subscribeToast = (listener: Listener): (() => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

// Callable from anywhere (React or not) — e.g. the React Query error handler.
export const showToast = (message: string, type: ToastType = 'info'): void => {
  const toast: ToastMessage = { id: (counter += 1), message, type };
  listeners.forEach((l) => l(toast));
};

export const useToast = () => ({ show: showToast });
