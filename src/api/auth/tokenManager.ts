import { storageUtils } from '@/shared/storage';
import type { AuthSession } from './authTypes';

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  const [, payload] = token.split('.');
  if (!payload) return null;
  try {
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    return JSON.parse(globalThis.atob(padded));
  } catch {
    return null;
  }
};

export const tokenManager = {
  getAccessToken: (): Promise<string | null> => storageUtils.getAuthToken(),
  getRefreshToken: (): Promise<string | null> => storageUtils.getRefreshToken(),

  getCurrentSession: async (): Promise<AuthSession | null> => {
    const [accessToken, refreshToken] = await Promise.all([
      storageUtils.getAuthToken(),
      storageUtils.getRefreshToken(),
    ]);
    if (!accessToken) return null;

    const session: AuthSession = {
      accessToken,
    };
    if (refreshToken) session.refreshToken = refreshToken;
    const expiresAt = tokenManager.getAccessTokenExpiry(accessToken);
    if (expiresAt !== undefined) session.expiresAt = expiresAt;
    return session;
  },

  saveSession: async (session: AuthSession): Promise<void> => {
    await storageUtils.saveAuthToken(session.accessToken);
    if (session.refreshToken) await storageUtils.saveRefreshToken(session.refreshToken);
  },

  clearSession: (): Promise<void> => storageUtils.clearAuthData(),

  getAccessTokenExpiry: (accessToken: string): number | undefined => {
    const exp = decodeJwtPayload(accessToken)?.exp;
    return typeof exp === 'number' ? exp * 1000 : undefined;
  },

  isAccessTokenExpiringSoon: (accessToken: string, skewMs = 60_000): boolean => {
    const expiresAt = tokenManager.getAccessTokenExpiry(accessToken);
    if (!expiresAt) return false;
    return expiresAt - Date.now() <= skewMs;
  },
};
