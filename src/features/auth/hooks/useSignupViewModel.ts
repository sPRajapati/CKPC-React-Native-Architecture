import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { APP_ROUTES } from '@/navigation/routes';
import type { AuthStackParamList } from '@/navigation/types';
import { useAuthForm } from './useAuthForm';

export const useSignupViewModel = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { signup, loading, error, clearError } = useAuthForm();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = useCallback(
    (setter: (value: string) => void) => (value: string) => {
      clearError();
      setter(value);
    },
    [clearError],
  );

  const onSubmit = useCallback(async () => {
    try {
      await signup({ firstName, lastName, email, password });
    } catch {
      // failure is surfaced via `error`
    }
  }, [email, firstName, lastName, password, signup]);

  const goToLogin = useCallback(() => {
    navigation.navigate(APP_ROUTES.LOGIN);
  }, [navigation]);

  return {
    t,
    firstName,
    lastName,
    email,
    password,
    loading,
    error,
    onFirstNameChange: onChange(setFirstName),
    onLastNameChange: onChange(setLastName),
    onEmailChange: onChange(setEmail),
    onPasswordChange: onChange(setPassword),
    onSubmit,
    goToLogin,
  };
};
