import { StyleSheet, View } from 'react-native';
import { Text } from '../atoms/Text';
import { Avatar } from '../molecules/Avatar';

interface ProfileHeaderProps {
  name: string;
  email?: string;
  avatar?: string;
}

export const ProfileHeader = ({ name, email, avatar }: ProfileHeaderProps) => (
  <View style={styles.container}>
    <Avatar name={name} uri={avatar} size={72} />
    <Text variant="title" style={styles.name}>
      {name}
    </Text>
    {email ? <Text variant="caption">{email}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 6 },
  name: { textAlign: 'center' },
});
