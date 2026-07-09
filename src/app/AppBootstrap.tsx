import { useEffect, useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Loader } from '@/shared/components';
import { useAppDispatch } from '@/store/hooks';
import { hydrateAuth } from '@/features/auth';
import { restoreLanguage } from '@/i18n/language';

// Restores session + language before rendering the app.
export const AppBootstrap = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const restore = async () => {
      await Promise.all([dispatch(hydrateAuth()), restoreLanguage()]);
      setReady(true);
    };
    restore();
  }, [dispatch]);

  if (!ready) {
    return (
      <View style={styles.center}>
        <Loader overlay />
      </View>
    );
  }
  return <>{children}</>;
};

const styles = StyleSheet.create({ center: { flex: 1 } });
