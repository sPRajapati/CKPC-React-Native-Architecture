import { coordinateLogout } from '@/shared/session/logoutCoordinator';
import { tokenManager } from './tokenManager';
import type { AuthService, AuthSession } from './authTypes';
import { refreshSession as refreshLegacySession } from '@/features/auth/refreshSession';

export const authSessionManager: AuthService = {
  getCurrentSession: (): Promise<AuthSession | null> => tokenManager.getCurrentSession(),

  refreshSession: async (): Promise<AuthSession | null> => {
    const accessToken = await refreshLegacySession();
    if (!accessToken) return null;
    return tokenManager.getCurrentSession();
  },

  signOut: async (): Promise<void> => {
    await coordinateLogout({ callApi: false });
  },
};
