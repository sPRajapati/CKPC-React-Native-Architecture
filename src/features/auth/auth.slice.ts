import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getErrorMessage } from '@/shared/utils';
import type { AuthData, AuthState, LoginPayload, SignupPayload } from './auth.types';
import { login as loginService, signup as signupService, logout as logoutService } from './services';

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk<AuthData, LoginPayload>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginService(payload);
      if (!res.success) throw new Error(res.message ?? 'Login failed');
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const signupThunk = createAsyncThunk<AuthData, SignupPayload>(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await signupService(payload);
      if (!res.success) throw new Error(res.message ?? 'Signup failed');
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  try {
    await logoutService();
  } catch {
    // ignore remote failure; local session is cleared regardless
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: () => initialState,
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
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
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => applyAuth(state, action.payload))
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Login failed';
      })
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => applyAuth(state, action.payload))
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Signup failed';
      })
      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const { clearAuth, setError } = authSlice.actions;
export default authSlice.reducer;
