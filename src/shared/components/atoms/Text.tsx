import { Text as RNText, StyleSheet, TextProps } from 'react-native';
import { colors, rpx } from '@/shared/constants';

type Variant = 'title' | 'body' | 'caption' | 'label' | 'tabLabel';

interface Props extends TextProps {
  variant?: Variant;
}

// Atom: typography primitive with a small set of variants.
export const Text = ({ variant = 'body', style, ...rest }: Props) => (
  <RNText style={[styles[variant], style]} {...rest} />
);

const styles = StyleSheet.create({
  title: { fontSize: rpx(28), fontWeight: '700', color: colors.text },
  body: { fontSize: rpx(16), color: colors.text },
  caption: { fontSize: rpx(12), color: colors.muted },
  label: { fontSize: rpx(14), fontWeight: '500', color: colors.text },
  tabLabel: { fontSize: rpx(12), fontWeight: '600', color: colors.text },
});
