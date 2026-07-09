import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { colors } from '@/shared/constants';

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
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
  },
});
