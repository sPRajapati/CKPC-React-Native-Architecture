import { authSessionManager } from './authSessionManager';
import type { AuthSession } from './authTypes';

let refreshPromise: Promise<AuthSession | null> | null = null;

export const refreshTokenOnce = (): Promise<AuthSession | null> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = authSessionManager.refreshSession().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
};

export const expireSessionOnce = (() => {
  let inFlight: Promise<void> | null = null;

  return (): Promise<void> => {
    if (inFlight) return inFlight;
    inFlight = authSessionManager.signOut().finally(() => {
      inFlight = null;
    });
    return inFlight;
  };
})();
