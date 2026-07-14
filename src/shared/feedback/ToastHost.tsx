import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { rpx } from '@/shared/constants';
import { useTheme } from '@/shared/theme';
import { subscribeToast, type ToastMessage, type ToastType } from './toast';

const DURATION = 3000;

export const ToastHost = () => {
  const { theme } = useTheme();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(
    () =>
      subscribeToast((toast) => {
        setToasts((prev) => [...prev, toast]);
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        }, DURATION);
      }),
    [],
  );

  const bg = (type: ToastType): string => {
    if (type === 'error') return theme.colors.error;
    if (type === 'success') return theme.colors.primary;
    return theme.colors.surface;
  };

  if (toasts.length === 0) return null;

  return (
    <View style={styles.host} pointerEvents="none">
      {toasts.map((toast) => (
        <View key={toast.id} style={[styles.toast, { backgroundColor: bg(toast.type) }]}>
          <Text style={[styles.text, { color: theme.colors.white }]}>{toast.message}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  host: { position: 'absolute', left: rpx(16), right: rpx(16), bottom: rpx(32), gap: rpx(8) },
  toast: { borderRadius: rpx(10), paddingVertical: rpx(12), paddingHorizontal: rpx(16) },
  text: { fontSize: rpx(14), fontWeight: '500' },
});
