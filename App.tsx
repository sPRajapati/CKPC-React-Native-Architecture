import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '@/i18n';
import { store } from '@/store';
import { queryClient, setupInterceptors } from '@/api';
import { setupSslPinning } from '@/shared/security';
import { RootNavigator } from '@/navigation/RootNavigator';

// Enable pinning first (no-op until you add pins), then attach interceptors.
setupSslPinning();
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
