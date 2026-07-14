import { StyleSheet, Text, View } from 'react-native';

import { Screen, Button } from '@/shared/components';
import { colors, rpx } from '@/shared/constants';
import { AuthField } from '../components';
import { useLoginViewModel } from '../hooks';

export const LoginScreen = () => {
  const vm = useLoginViewModel();

  return (
    <Screen>
      <Text style={styles.title}>{vm.t('auth.login')}</Text>
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
      <Button title={vm.t('auth.login')} loading={vm.loading} onPress={vm.onSubmit} />
      <View style={styles.footer}>
        <Text>{vm.t('auth.noAccount')} </Text>
        <Text
          style={styles.link}
          onPress={vm.goToSignup}
        >
          {vm.t('auth.signup')}
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
