import { StyleSheet, View } from 'react-native';
import { Screen, Avatar, Text, Card } from '@/shared/components';
import { useProfileViewModel } from '../hooks/useProfileViewModel';

export const ProfileScreen = () => {
  const vm = useProfileViewModel();

  return (
    <Screen>
      <View style={styles.header}>
        <Avatar name={vm.name} uri={vm.user?.avatar} size={72} />
        <Text variant="title">{vm.name}</Text>
        {vm.user?.email ? <Text variant="caption">{vm.user.email}</Text> : null}
      </View>
      <Text style={styles.bio}>{vm.bio}</Text>
      <Card title="Stats">
        <View style={styles.stats}>
          {vm.stats.map((stat) => (
            <View key={stat.label} style={styles.stat}>
              <Text variant="title">{String(stat.value)}</Text>
              <Text variant="caption">{stat.label}</Text>
            </View>
          ))}
        </View>
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: { alignItems: 'center', gap: 6, marginBottom: 16 },
  bio: { marginBottom: 16 },
  stats: { flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
});
