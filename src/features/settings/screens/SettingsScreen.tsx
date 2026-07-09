import { StyleSheet, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Screen, Button, Text, ListItem } from '@/shared/components';
import { useTheme } from '@/shared/theme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLanguage } from '@/i18n/language';
import { coordinateLogout } from '@/shared/session/logoutCoordinator';
import { toggleNotifications } from '../settings.slice';

export const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const notificationsEnabled = useAppSelector(
    (state) => state.settings.notificationsEnabled,
  );
  const isSpanish = i18n.language === 'es';

  return (
    <Screen>
      <Text variant="title" style={styles.title}>
        {t('settings.title')}
      </Text>
      <ListItem
        label={t('settings.darkMode')}
        right={<Switch value={isDark} onValueChange={toggleTheme} />}
      />
      <ListItem
        label={t('settings.notifications')}
        right={
          <Switch
            value={notificationsEnabled}
            onValueChange={() => {
              dispatch(toggleNotifications());
            }}
          />
        }
      />
      <ListItem
        label={t('settings.spanish')}
        right={
          <Switch
            value={isSpanish}
            onValueChange={(value) => setLanguage(value ? 'es' : 'en')}
          />
        }
      />
      <Button title={t('settings.logout')} onPress={() => coordinateLogout()} />
    </Screen>
  );
};

const styles = StyleSheet.create({ title: { marginBottom: 16 } });
