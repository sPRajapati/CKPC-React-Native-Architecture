import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '@/shared/constants';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string | null;
}

export const TextField = ({ label, error, style, ...rest }: TextFieldProps) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, !!error && styles.inputError, style]}
      placeholderTextColor={colors.muted}
      {...rest}
    />
    {!!error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  wrapper: { marginBottom: 14 },
  label: { color: colors.text, marginBottom: 6, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
  },
  inputError: { borderColor: colors.error },
  error: { color: colors.error, marginTop: 4, fontSize: 12 },
});
