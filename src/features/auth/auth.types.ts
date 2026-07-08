import type { User } from '@/shared/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthData {
  token: string;
  refreshToken?: string;
  user: User;
}

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}
