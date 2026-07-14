import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { colors, rpx } from '@/shared/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const Button = ({ title, onPress, loading, disabled }: ButtonProps) => (
  <Pressable
    style={[styles.button, (disabled || loading) && styles.disabled]}
    onPress={onPress}
    disabled={disabled || loading}
  >
    {loading ? (
      <ActivityIndicator color={colors.white} />
    ) : (
      <Text style={styles.label}>{title}</Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: rpx(10),
    paddingVertical: rpx(14),
    alignItems: 'center',
    marginTop: rpx(8),
  },
  disabled: { opacity: 0.6 },
  label: { color: colors.white, fontSize: rpx(16), fontWeight: '600' },
});
