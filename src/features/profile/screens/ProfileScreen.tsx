import { StyleSheet, View } from 'react-native';
import { Screen, Avatar, Text, Card } from '@/shared/components';
import { useProfile } from '../hooks/useProfile';

export const ProfileScreen = () => {
  const { user, bio, stats } = useProfile();
  const name = user ? `${user.firstName} ${user.lastName}` : 'Guest';

  return (
    <Screen>
      <View style={styles.header}>
        <Avatar name={name} uri={user?.avatar} size={72} />
        <Text variant="title">{name}</Text>
        {user?.email ? <Text variant="caption">{user.email}</Text> : null}
      </View>
      <Text style={styles.bio}>{bio}</Text>
      <Card title="Stats">
        <View style={styles.stats}>
          {stats.map((stat) => (
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
