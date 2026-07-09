import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '@/i18n';
import { store } from '@/store';
import { queryClient, setupInterceptors } from '@/api';
import { setupSslPinning } from '@/shared/security';
import { ThemeProvider } from '@/shared/theme';
import { ToastHost } from '@/shared/feedback';
import { AppBootstrap } from '@/app/AppBootstrap';
import { ErrorBoundary } from '@/app/ErrorBoundary';
import { RootNavigator } from '@/navigation/RootNavigator';

setupSslPinning();
setupInterceptors();

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <StatusBar style="auto" />
              <AppBootstrap>
                <RootNavigator />
              </AppBootstrap>
              <ToastHost />
            </SafeAreaProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
