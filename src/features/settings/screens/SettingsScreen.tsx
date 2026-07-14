import { StyleSheet, Switch } from 'react-native';
import { Screen, Button, Text, ListItem } from '@/shared/components';
import { useSettingsViewModel } from '../hooks';

export const SettingsScreen = () => {
  const vm = useSettingsViewModel();

  return (
    <Screen>
      <Text variant="title" style={styles.title}>
        {vm.t('settings.title')}
      </Text>
      <ListItem
        label={vm.t('settings.darkMode')}
        right={<Switch value={vm.isDark} onValueChange={vm.toggleTheme} />}
      />
      <ListItem
        label={vm.t('settings.notifications')}
        right={
          <Switch
            value={vm.notificationsEnabled}
            onValueChange={vm.toggleNotificationSetting}
          />
        }
      />
      <ListItem
        label={vm.t('settings.spanish')}
        right={
          <Switch
            value={vm.isSpanish}
            onValueChange={vm.setSpanishEnabled}
          />
        }
      />
      <Button title={vm.t('settings.logout')} onPress={vm.logout} />
    </Screen>
  );
};

const styles = StyleSheet.create({ title: { marginBottom: 16 } });
