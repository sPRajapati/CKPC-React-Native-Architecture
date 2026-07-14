import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { colors, rpx } from '@/shared/constants';

// Atom: a bare text input. No label/error — that composition lives in molecules.
export const Input = ({ style, ...rest }: TextInputProps) => (
  <TextInput
    style={[styles.input, style]}
    placeholderTextColor={colors.muted}
    {...rest}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: rpx(10),
    paddingHorizontal: rpx(14),
    paddingVertical: rpx(12),
    color: colors.text,
  },
});
