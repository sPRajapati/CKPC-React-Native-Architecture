import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rpx } from '@/shared/constants';
import { useTheme } from '@/shared/theme';

export const Screen = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { flex: 1, paddingHorizontal: rpx(20), paddingVertical: rpx(20) },
});
