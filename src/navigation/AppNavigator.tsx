import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/features/home';
import { APP_ROUTES } from './routes';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name={APP_ROUTES.HOME} component={HomeScreen} />
  </Stack.Navigator>
);
