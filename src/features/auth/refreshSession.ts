import { store } from '@/store';
import { storageUtils } from '@/shared/storage';
import { setTokens } from './auth.slice';
import { refresh as refreshService } from './services/auth.api';

let inFlight: Promise<string | null> | null = null;

/**
 * Exchanges the stored refresh token for a new access token, updates the store +
 * storage, and returns the new token (or null if refresh isn't possible).
 * De-duplicated: concurrent 401s share a single refresh call.
 */
export const refreshSession = (): Promise<string | null> => {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const refreshToken = await storageUtils.getRefreshToken();
      if (!refreshToken) return null;

      const res = await refreshService(refreshToken);
      if (!res.success) return null;

      const { token, refreshToken: nextRefresh } = res.data;
      store.dispatch(setTokens({ token, refreshToken: nextRefresh ?? null }));
      await storageUtils.saveAuthToken(token);
      if (nextRefresh) await storageUtils.saveRefreshToken(nextRefresh);
      return token;
    } catch {
      return null;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
};
