import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { isRequired, isValidEmail, isValidPassword } from '@/shared/utils';
import { loginAsync, signupAsync, setError } from '../auth.slice';
import type { LoginPayload, SignupPayload } from '../auth.types';

/**
 * Screen-facing form logic for auth: local validation + dispatching Toolkit async actions.
 * Server/auth state (loading, error) comes from the Redux slice.
 */
export const useAuthForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [validationError, setValidationError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    if (validationError) setValidationError(null);
    if (error) dispatch(setError(null));
  }, [dispatch, error, validationError]);

  const validateLogin = (payload: LoginPayload): string | null => {
    if (!isValidEmail(payload.email)) return 'Invalid email address';
    if (!isValidPassword(payload.password)) return 'Password must be at least 8 characters';
    return null;
  };

  const validateSignup = (payload: SignupPayload): string | null => {
    if (!isRequired(payload.firstName) || !isRequired(payload.lastName)) {
      return 'First and last name are required';
    }
    return validateLogin(payload);
  };

  const login = useCallback(
    (payload: LoginPayload) => {
      const nextError = validateLogin(payload);
      if (nextError) {
        setValidationError(nextError);
        return;
      }
      setValidationError(null);
      return dispatch(loginAsync(payload)).unwrap();
    },
    [dispatch],
  );

  const signup = useCallback(
    (payload: SignupPayload) => {
      const nextError = validateSignup(payload);
      if (nextError) {
        setValidationError(nextError);
        return;
      }
      setValidationError(null);
      return dispatch(signupAsync(payload)).unwrap();
    },
    [dispatch],
  );

  return {
    login,
    signup,
    clearError,
    loading,
    error: validationError ?? error,
  };
};
