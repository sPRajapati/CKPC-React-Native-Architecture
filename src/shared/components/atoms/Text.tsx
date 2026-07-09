import { Text as RNText, StyleSheet, TextProps } from 'react-native';
import { colors } from '@/shared/constants';

type Variant = 'title' | 'body' | 'caption' | 'label';

interface Props extends TextProps {
  variant?: Variant;
}

// Atom: typography primitive with a small set of variants.
export const Text = ({ variant = 'body', style, ...rest }: Props) => (
  <RNText style={[styles[variant], style]} {...rest} />
);

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700', color: colors.text },
  body: { fontSize: 16, color: colors.text },
  caption: { fontSize: 12, color: colors.muted },
  label: { fontSize: 14, fontWeight: '500', color: colors.text },
});
