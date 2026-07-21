export interface AuthSession {
  accessToken: string;
  idToken?: string | undefined;
  refreshToken?: string | undefined;
  expiresAt?: number | undefined;
}

export interface AuthService {
  getCurrentSession(): Promise<AuthSession | null>;
  refreshSession(): Promise<AuthSession | null>;
  signOut(): Promise<void>;
}
