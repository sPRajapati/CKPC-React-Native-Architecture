import { store } from '@/store';
import { clearAuth, logoutAsync } from '@/features/auth';
import { storageUtils } from '@/shared/storage';

interface LogoutOptions {
  // true  = user-initiated (calls the logout endpoint)
  // false = forced by 401/session-expiry (no network, avoids a loop)
  callApi?: boolean;
}

/**
 * Single entry point for ending a session. Both the logout button and the axios
 * 401 handler go through here, so teardown stays consistent. Navigation reacts
 * to `state.auth.token` clearing, so no manual reset is needed.
 */
export const coordinateLogout = async ({ callApi = true }: LogoutOptions = {}) => {
  if (callApi) {
    await store.dispatch(logoutAsync());
    return;
  }
  store.dispatch(clearAuth());
  await storageUtils.clearAuthData();
};
