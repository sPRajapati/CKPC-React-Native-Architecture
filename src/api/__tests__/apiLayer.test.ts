import { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import NetInfo from '@react-native-community/netinfo';
import * as SecureStore from 'expo-secure-store';
import { z } from 'zod';

import { authSessionManager } from '../auth/authSessionManager';
import { refreshTokenOnce } from '../auth/tokenRefreshCoordinator';
import { requestInterceptor } from '../client/requestInterceptor';
import { shouldRetryRequest } from '../client/retryPolicy';
import { ApiError } from '../errors/ApiError';
import { API_ERROR_CODES } from '../errors/errorCodes';
import { redactSensitiveData } from '../safeLogger';
import { validateResponse } from '../validation/validateResponse';

const makeConfig = (
  overrides: Partial<InternalAxiosRequestConfig> = {},
): InternalAxiosRequestConfig =>
  ({
    method: 'get',
    url: '/secure',
    headers: new AxiosHeaders(),
    ...overrides,
  }) as InternalAxiosRequestConfig;

describe('api layer security helpers', () => {
  beforeEach(() => {
    jest.mocked(NetInfo.fetch).mockResolvedValue({ isConnected: true } as never);
  });

  it('attaches an access token to protected requests', async () => {
    jest.mocked(SecureStore.getItemAsync).mockResolvedValueOnce('access-token');

    const config = await requestInterceptor(makeConfig());

    expect(config.headers.get('Authorization')).toBe('Bearer access-token');
  });

  it('omits Authorization for public requests', async () => {
    jest.mocked(SecureStore.getItemAsync).mockResolvedValueOnce('access-token');

    const config = await requestInterceptor(
      makeConfig({ metadata: { requiresAuth: false } }),
    );

    expect(config.headers.has('Authorization')).toBe(false);
  });

  it('generates and preserves correlation metadata', async () => {
    const config = await requestInterceptor(
      makeConfig({ metadata: { correlationId: 'request-123' } }),
    );

    expect(config.headers.get('X-Correlation-ID')).toBe('request-123');
    expect(config.metadata?.correlationId).toBe('request-123');
  });

  it('maps offline state to a normalized API error', async () => {
    jest.mocked(NetInfo.fetch).mockResolvedValueOnce({ isConnected: false } as never);

    await expect(requestInterceptor(makeConfig())).rejects.toMatchObject({
      code: API_ERROR_CODES.NETWORK_ERROR,
    });
  });

  it('validates successful responses with Zod', () => {
    const schema = z.object({ id: z.string() });

    expect(validateResponse({ id: '1' }, schema)).toEqual({ id: '1' });
  });

  it('throws a normalized validation error for invalid responses', () => {
    const schema = z.object({ id: z.string() });

    expect(() => validateResponse({ id: 1 }, schema, 'abc')).toThrow(ApiError);
  });

  it('redacts sensitive logging fields', () => {
    expect(
      redactSensitiveData({
        Authorization: 'Bearer secret',
        accessToken: 'secret',
        route: '/home/feed',
      }),
    ).toEqual({
      Authorization: '[REDACTED]',
      accessToken: '[REDACTED]',
      route: '/home/feed',
    });
  });

  it('retries idempotent temporary failures only', () => {
    const retryable = {
      response: { status: 503 },
    };
    const forbidden = {
      response: { status: 403 },
    };

    expect(shouldRetryRequest(retryable as never, { method: 'GET' })).toBe(true);
    expect(shouldRetryRequest(forbidden as never, { method: 'GET' })).toBe(false);
    expect(shouldRetryRequest(retryable as never, { method: 'POST' })).toBe(false);
  });

  it('coalesces simultaneous token refresh calls', async () => {
    const refreshSpy = jest
      .spyOn(authSessionManager, 'refreshSession')
      .mockResolvedValue({ accessToken: 'next-token' });

    const [first, second] = await Promise.all([refreshTokenOnce(), refreshTokenOnce()]);

    expect(first?.accessToken).toBe('next-token');
    expect(second?.accessToken).toBe('next-token');
    expect(refreshSpy).toHaveBeenCalledTimes(1);
  });
});
