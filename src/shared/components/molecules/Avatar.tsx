import { Image, StyleSheet, View } from 'react-native';
import { colors } from '@/shared/constants';
import { Text } from '../atoms/Text';

interface AvatarProps {
  uri?: string | undefined;
  name?: string | undefined;
  size?: number;
}

const initials = (name?: string) =>
  (name ?? '')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

// Molecule: image avatar with an initials fallback (Text atom).
export const Avatar = ({ uri, name, size = 48 }: AvatarProps) => {
  const dim = { width: size, height: size, borderRadius: size / 2 };
  if (uri) return <Image source={{ uri }} style={dim} />;
  return (
    <View style={[styles.fallback, dim]}>
      <Text style={styles.initials}>{initials(name)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { color: colors.white, fontWeight: '600' },
});
