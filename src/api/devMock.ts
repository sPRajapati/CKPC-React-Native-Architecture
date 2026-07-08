import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'Password123';

const ok = <T>(
  data: T,
  config: InternalAxiosRequestConfig,
): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config,
});

const mockUser = {
  id: '1',
  email: TEST_EMAIL,
  firstName: 'Test',
  lastName: 'User',
};

const authData = {
  success: true,
  message: 'OK (dev mock)',
  data: {
    token: `dev-token-${Date.now()}`,
    refreshToken: `dev-refresh-${Date.now()}`,
    user: mockUser,
  },
};

const feedData = {
  success: true,
  data: [
    { id: '1', title: 'Welcome', subtitle: 'This is dev-mock data' },
    { id: '2', title: 'Feature-sliced', subtitle: 'Feature-sliced architecture in Expo' },
    { id: '3', title: 'React Query', subtitle: 'Server state lives here' },
  ],
};

/**
 * In __DEV__ only, returns a canned response for known endpoints so the app is
 * demoable without a backend. Returns null for anything it doesn't handle.
 */
export const resolveDevMock = (
  config?: InternalAxiosRequestConfig,
): AxiosResponse | null => {
  if (!__DEV__ || !config?.url) return null;
  const url = config.url;
  const body = config.data ? JSON.parse(config.data) : {};

  if (url.includes('/auth/login')) {
    if (body.email === TEST_EMAIL && body.password === TEST_PASSWORD) {
      return ok(authData, config);
    }
    return ok({ success: false, message: 'Invalid credentials (dev mock)' }, config);
  }
  if (url.includes('/auth/signup')) return ok(authData, config);
  if (url.includes('/auth/logout')) {
    return ok({ success: true, data: { message: 'ok' } }, config);
  }
  if (url.includes('/home/feed')) return ok(feedData, config);

  return null;
};
