import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '@/store/hooks';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { navigationRef } from './RootNavigation';

export const RootNavigator = () => {
  const isAuthenticated = useAppSelector((state) => !!state.auth.token);

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
