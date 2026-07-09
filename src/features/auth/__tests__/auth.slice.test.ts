import authReducer, {
  clearAuth,
  setError,
  setTokens,
  loginThunk,
  hydrateAuth,
} from '../auth.slice';
import type { AuthData, LoginPayload } from '../auth.types';

const authData: AuthData = {
  token: 'token-123',
  refreshToken: 'refresh-123',
  user: { id: '1', email: 'user@example.com', firstName: 'Test', lastName: 'User' },
};
const arg: LoginPayload = { email: 'user@example.com', password: 'Password123' };

describe('auth slice', () => {
  it('sets and clears the error', () => {
    expect(authReducer(undefined, setError('bad')).error).toBe('bad');
  });

  it('applies auth on login fulfilled', () => {
    const state = authReducer(undefined, loginThunk.fulfilled(authData, 'id', arg));
    expect(state.token).toBe('token-123');
    expect(state.user?.email).toBe('user@example.com');
    expect(state.loading).toBe(false);
  });

  it('sets error on login rejected', () => {
    const action = {
      type: loginThunk.rejected.type,
      payload: 'Login failed',
      error: {},
    };
    expect(authReducer(undefined, action).error).toBe('Login failed');
  });

  it('resets state on clearAuth', () => {
    const filled = authReducer(undefined, loginThunk.fulfilled(authData, 'id', arg));
    const cleared = authReducer(filled, clearAuth());
    expect(cleared.token).toBeNull();
    expect(cleared.user).toBeNull();
  });

  it('updates tokens via setTokens (refresh)', () => {
    const filled = authReducer(undefined, loginThunk.fulfilled(authData, 'id', arg));
    const next = authReducer(filled, setTokens({ token: 'new-token', refreshToken: 'new-refresh' }));
    expect(next.token).toBe('new-token');
    expect(next.refreshToken).toBe('new-refresh');
    expect(next.user?.email).toBe('user@example.com');
  });

  it('restores a session via hydrateAuth', () => {
    const state = authReducer(undefined, hydrateAuth.fulfilled(authData, 'id', undefined));
    expect(state.token).toBe('token-123');
    expect(state.user?.firstName).toBe('Test');
  });
});
