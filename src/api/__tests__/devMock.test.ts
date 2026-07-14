import type { InternalAxiosRequestConfig } from 'axios';
import { resolveDevMock } from '../devMock';

const cfg = (url: string, data?: object): InternalAxiosRequestConfig =>
  ({ url, method: 'post', data: data ? JSON.stringify(data) : undefined, headers: {} }) as InternalAxiosRequestConfig;

describe('resolveDevMock', () => {
  it('returns a success response for valid login credentials', () => {
    const res = resolveDevMock(
      cfg('/auth/login', { email: 'demo@cpkc.dev', password: 'Password123' }),
    );
    expect(res?.status).toBe(200);
    expect((res?.data as { success: boolean }).success).toBe(true);
  });

  it('returns the feed for /home/feed', () => {
    const res = resolveDevMock(cfg('/home/feed'));
    expect(Array.isArray((res?.data as { data: unknown[] }).data)).toBe(true);
  });

  it('returns null for unknown endpoints', () => {
    expect(resolveDevMock(cfg('/unknown'))).toBeNull();
  });
});
