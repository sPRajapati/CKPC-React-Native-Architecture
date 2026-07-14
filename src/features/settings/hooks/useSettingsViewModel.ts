import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { setLanguage } from '@/i18n/language';
import { coordinateLogout } from '@/shared/session/logoutCoordinator';
import { useTheme } from '@/shared/theme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleNotifications } from '../settings.slice';

export const useSettingsViewModel = () => {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const notificationsEnabled = useAppSelector(
    (state) => state.settings.notificationsEnabled,
  );
  const isSpanish = i18n.language === 'es';

  const toggleNotificationSetting = useCallback(() => {
    dispatch(toggleNotifications());
  }, [dispatch]);

  const setSpanishEnabled = useCallback((value: boolean) => {
    setLanguage(value ? 'es' : 'en');
  }, []);

  return {
    t,
    isDark,
    toggleTheme,
    notificationsEnabled,
    toggleNotificationSetting,
    isSpanish,
    setSpanishEnabled,
    logout: coordinateLogout,
  };
};
