import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { useAppSelector } from '@/store/hooks';
import { useTheme } from '@/shared/theme';
import { AuthNavigator } from './AuthNavigator';
import { BottomTabNavigator } from './BottomTabNavigator';
import { navigationRef } from './RootNavigation';

export const RootNavigator = () => {
  const isAuthenticated = useAppSelector((state) => Boolean(state.auth.token));
  const { isDark } = useTheme();

  return (
    <NavigationContainer ref={navigationRef} theme={isDark ? DarkTheme : DefaultTheme}>
      {isAuthenticated ? <BottomTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
