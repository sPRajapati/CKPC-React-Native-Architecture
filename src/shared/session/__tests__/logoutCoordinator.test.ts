import { store } from '@/store';
import { loginThunk } from '@/features/auth';
import { coordinateLogout } from '../logoutCoordinator';

describe('logoutCoordinator', () => {
  it('clears auth state without calling the logout API for forced logout', async () => {
    store.dispatch(
      loginThunk.fulfilled(
        {
          token: 'token-123',
          refreshToken: 'refresh-123',
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
          },
        },
        'request-id',
        { email: 'test@example.com', password: 'Password123' },
      ),
    );

    await coordinateLogout({ callApi: false });

    expect(store.getState().auth.token).toBeNull();
    expect(store.getState().auth.user).toBeNull();
  });
});
