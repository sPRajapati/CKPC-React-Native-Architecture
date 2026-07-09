import { StyleSheet, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import { colors } from '@/shared/constants';
import { Text } from '../atoms/Text';
import { Input } from '../atoms/Input';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string | null;
}

// Molecule: label + input + error, composed from atoms.
export const TextField = ({ label, error, style, ...rest }: TextFieldProps) => (
  <View style={styles.wrapper}>
    <Text variant="label" style={styles.label}>
      {label}
    </Text>
    <Input style={[!!error && styles.inputError, style]} {...rest} />
    {!!error && (
      <Text variant="caption" style={styles.error}>
        {error}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  wrapper: { marginBottom: 14 },
  label: { marginBottom: 6 },
  inputError: { borderColor: colors.error },
  error: { color: colors.error, marginTop: 4 },
});
