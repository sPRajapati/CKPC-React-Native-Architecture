import { StyleSheet, Text, View } from 'react-native';

import { Screen, Button } from '@/shared/components';
import { colors, rpx } from '@/shared/constants';
import { AuthField } from '../components';
import { useSignupViewModel } from '../hooks';

export const SignupScreen = () => {
  const vm = useSignupViewModel();

  return (
    <Screen>
      <Text style={styles.title}>{vm.t('auth.signup')}</Text>
      <AuthField label={vm.t('auth.firstName')} value={vm.firstName} onChangeText={vm.onFirstNameChange} />
      <AuthField label={vm.t('auth.lastName')} value={vm.lastName} onChangeText={vm.onLastNameChange} />
      <AuthField
        label={vm.t('auth.email')}
        value={vm.email}
        onChangeText={vm.onEmailChange}
        keyboardType="email-address"
      />
      <AuthField
        label={vm.t('auth.password')}
        value={vm.password}
        onChangeText={vm.onPasswordChange}
        secureTextEntry
      />
      {!!vm.error && <Text style={styles.error}>{vm.error}</Text>}
      <Button title={vm.t('auth.signup')} loading={vm.loading} onPress={vm.onSubmit} />
      <View style={styles.footer}>
        <Text>{vm.t('auth.hasAccount')} </Text>
        <Text style={styles.link} onPress={vm.goToLogin}>
          {vm.t('auth.login')}
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: rpx(28), fontWeight: '700', marginBottom: rpx(24), color: colors.text },
  error: { color: colors.error, marginBottom: rpx(8) },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: rpx(16) },
  link: { color: colors.primary, fontWeight: '600' },
});
