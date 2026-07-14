import { StyleSheet, View } from 'react-native';
import { Text } from '../atoms/Text';
import { Avatar } from './Avatar';

interface ProfileInfoProps {
  name: string;
  email?: string | undefined;
  avatar?: string | undefined;
}

export const ProfileInfo = ({ name, email, avatar }: ProfileInfoProps) => (
  <View style={styles.container}>
    <Avatar name={name} uri={avatar} size={56} />
    <View style={styles.copy}>
      <Text variant="label">{name}</Text>
      {email ? <Text variant="caption">{email}</Text> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  copy: { flex: 1, gap: 2 },
});
