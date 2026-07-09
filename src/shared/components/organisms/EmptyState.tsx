import type { LucideIcon } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/shared/constants';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
}

// Organism: centered empty/placeholder state (Icon + Text atoms).
export const EmptyState = ({ icon, title, subtitle }: EmptyStateProps) => (
  <View style={styles.wrapper}>
    {icon ? <Icon icon={icon} size={40} color={colors.muted} /> : null}
    <Text variant="body" style={styles.title}>
      {title}
    </Text>
    {subtitle ? <Text variant="caption">{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', justifyContent: 'center', padding: 32, gap: 8 },
  title: { fontWeight: '600' },
});
