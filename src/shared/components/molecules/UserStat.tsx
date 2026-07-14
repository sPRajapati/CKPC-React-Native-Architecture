import { StyleSheet, View } from 'react-native';
import { rpx } from '@/shared/constants';
import { Text } from '../atoms/Text';

interface UserStatProps {
  label: string;
  value: number | string;
}

export const UserStat = ({ label, value }: UserStatProps) => (
  <View style={styles.container}>
    <Text variant="title" style={styles.value}>
      {String(value)}
    </Text>
    <Text variant="caption">{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', minWidth: rpx(72) },
  value: { fontSize: rpx(22) },
});
