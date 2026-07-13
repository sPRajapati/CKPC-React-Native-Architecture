import { StyleSheet, View } from 'react-native';
import { UserStat } from '../molecules/UserStat';

interface ProfileStatsProps {
  stats: { label: string; value: number | string }[];
}

export const ProfileStats = ({ stats }: ProfileStatsProps) => (
  <View style={styles.container}>
    {stats.map((stat) => (
      <UserStat key={stat.label} label={stat.label} value={stat.value} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around' },
});
