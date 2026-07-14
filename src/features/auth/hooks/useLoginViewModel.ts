import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { APP_ROUTES } from '@/navigation/routes';
import type { AuthStackParamList } from '@/navigation/types';
import { useAuthForm } from './useAuthForm';

export const useLoginViewModel = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { login, loading, error, clearError } = useAuthForm();
  const [email, setEmail] = useState(__DEV__ ? 'demo@cpkc.dev' : '');
  const [password, setPassword] = useState(__DEV__ ? 'Password123' : '');

  const onChange = useCallback(
    (setter: (value: string) => void) => (value: string) => {
      clearError();
      setter(value);
    },
    [clearError],
  );

  const onSubmit = useCallback(async () => {
    try {
      await login({ email, password });
    } catch {
      // failure is already surfaced via `error`
    }
  }, [email, login, password]);

  const goToSignup = useCallback(() => {
    navigation.navigate(APP_ROUTES.SIGNUP);
  }, [navigation]);

  return {
    t,
    email,
    password,
    loading,
    error,
    onEmailChange: onChange(setEmail),
    onPasswordChange: onChange(setPassword),
    onSubmit,
    goToSignup,
  };
};
