import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SignupScreen } from '@/features/auth';
import { APP_ROUTES } from './routes';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={APP_ROUTES.LOGIN} component={LoginScreen} />
    <Stack.Screen name={APP_ROUTES.SIGNUP} component={SignupScreen} />
  </Stack.Navigator>
);
