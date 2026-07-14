import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getErrorMessage } from '@/shared/utils';
import { storageUtils } from '@/shared/storage';
import type { AuthData, AuthState, LoginPayload, SignupPayload } from './auth.types';
import {
  login as loginService,
  signup as signupService,
  logout as logoutService,
} from './services';

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  loading: false,
  error: null,
};

const persistAuth = async (data: AuthData) => {
  await storageUtils.saveAuthToken(data.token);
  if (data.refreshToken) await storageUtils.saveRefreshToken(data.refreshToken);
  await storageUtils.saveUser(data.user);
};

export const loginAsync = createAsyncThunk<AuthData, LoginPayload>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginService(payload);
      if (!res.success) throw new Error(res.message ?? 'Login failed');
      await persistAuth(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const signupAsync = createAsyncThunk<AuthData, SignupPayload>(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await signupService(payload);
      if (!res.success) throw new Error(res.message ?? 'Signup failed');
      await persistAuth(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  try {
    await logoutService();
  } finally {
    await storageUtils.clearAuthData();
  }
});

/** Restores a persisted session on app start. */
export const hydrateAuth = createAsyncThunk<AuthData | null>(
  'auth/hydrate',
  async () => {
    const [token, refreshToken, user] = await Promise.all([
      storageUtils.getAuthToken(),
      storageUtils.getRefreshToken(),
      storageUtils.getUser(),
    ]);
    if (token && user) return { token, refreshToken: refreshToken ?? undefined, user };
    return null;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: () => initialState,
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTokens: (
      state,
      action: PayloadAction<{ token: string; refreshToken?: string | null }>,
    ) => {
      state.token = action.payload.token;
      if (action.payload.refreshToken !== undefined) {
        state.refreshToken = action.payload.refreshToken;
      }
    },
  },
  extraReducers: (builder) => {
    const applyAuth = (state: AuthState, data: AuthData) => {
      state.loading = false;
      state.token = data.token;
      state.refreshToken = data.refreshToken ?? null;
      state.user = data.user;
      state.error = null;
    };

    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => applyAuth(state, action.payload))
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Login failed';
      })
      .addCase(signupAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAsync.fulfilled, (state, action) => applyAuth(state, action.payload))
      .addCase(signupAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Signup failed';
      })
      .addCase(logoutAsync.fulfilled, () => initialState)
      .addCase(logoutAsync.rejected, () => initialState)
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        if (action.payload) applyAuth(state, action.payload);
      });
  },
});

export const { clearAuth, setError, setTokens } = authSlice.actions;
export default authSlice.reducer;
