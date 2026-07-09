import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/shared/constants';
import { Text } from '../atoms/Text';

interface CardProps {
  title?: string;
  children: ReactNode;
}

// Organism: titled container that groups molecules/atoms into a section.
export const Card = ({ title, children }: CardProps) => (
  <View style={styles.card}>
    {title ? (
      <Text variant="label" style={styles.title}>
        {title}
      </Text>
    ) : null}
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  title: { marginBottom: 8 },
});
