import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '@/i18n';
import { store } from '@/store';
import { queryClient, setupInterceptors } from '@/api';
import { RootNavigator } from '@/navigation/RootNavigator';

// Attach axios interceptors once, after the store module has initialized.
setupInterceptors();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
}
