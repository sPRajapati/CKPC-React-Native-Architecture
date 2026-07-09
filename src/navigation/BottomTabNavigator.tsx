import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, User, Settings as SettingsGlyph } from 'lucide-react-native';
import { HomeScreen } from '@/features/home';
import { ProfileScreen } from '@/features/profile';
import { SettingsScreen } from '@/features/settings';
import { APP_ROUTES } from './routes';
import type { AppTabParamList } from './types';

const Tab = createBottomTabNavigator<AppTabParamList>();

export const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={APP_ROUTES.HOME}
      component={HomeScreen}
      options={{ tabBarIcon: ({ color, size }) => <House color={color} size={size} /> }}
    />
    <Tab.Screen
      name={APP_ROUTES.PROFILE}
      component={ProfileScreen}
      options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
    />
    <Tab.Screen
      name={APP_ROUTES.SETTINGS}
      component={SettingsScreen}
      options={{ tabBarIcon: ({ color, size }) => <SettingsGlyph color={color} size={size} /> }}
    />
  </Tab.Navigator>
);
