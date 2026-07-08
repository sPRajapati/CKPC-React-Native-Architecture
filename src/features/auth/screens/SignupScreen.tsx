import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { Screen, Button } from '@/shared/components';
import { colors } from '@/shared/constants';
import { APP_ROUTES } from '@/navigation/routes';
import type { AuthStackParamList } from '@/navigation/types';
import { AuthField } from '../components';
import { useAuthForm } from '../hooks';

export const SignupScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { signup, loading, error, clearError } = useAuthForm();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (setter: (v: string) => void) => (value: string) => {
    clearError();
    setter(value);
  };

  const onSubmit = async () => {
    try {
      await signup({ firstName, lastName, email, password });
    } catch {
      // failure is surfaced via `error`
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>{t('auth.signup')}</Text>
      <AuthField label={t('auth.firstName')} value={firstName} onChangeText={onChange(setFirstName)} />
      <AuthField label={t('auth.lastName')} value={lastName} onChangeText={onChange(setLastName)} />
      <AuthField
        label={t('auth.email')}
        value={email}
        onChangeText={onChange(setEmail)}
        keyboardType="email-address"
      />
      <AuthField
        label={t('auth.password')}
        value={password}
        onChangeText={onChange(setPassword)}
        secureTextEntry
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Button title={t('auth.signup')} loading={loading} onPress={onSubmit} />
      <View style={styles.footer}>
        <Text>{t('auth.hasAccount')} </Text>
        <Text style={styles.link} onPress={() => navigation.navigate(APP_ROUTES.LOGIN)}>
          {t('auth.login')}
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24, color: colors.text },
  error: { color: colors.error, marginBottom: 8 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  link: { color: colors.primary, fontWeight: '600' },
});
