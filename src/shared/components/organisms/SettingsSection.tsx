import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../atoms/Text';

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

export const SettingsSection = ({ title, children }: SettingsSectionProps) => (
  <View style={styles.container}>
    <Text variant="label" style={styles.title}>
      {title}
    </Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { gap: 8, marginBottom: 20 },
  title: { textTransform: 'uppercase' },
});
