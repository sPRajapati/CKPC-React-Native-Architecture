import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '@/shared/constants';
import { Text } from '../atoms/Text';

interface ListItemProps {
  label: string;
  right?: ReactNode;
  onPress?: () => void;
}

// Molecule: a labeled row with an optional trailing control (switch, chevron…).
export const ListItem = ({ label, right, onPress }: ListItemProps) => (
  <Pressable style={styles.row} onPress={onPress} disabled={!onPress}>
    <Text variant="body">{label}</Text>
    {right ? <View>{right}</View> : null}
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
