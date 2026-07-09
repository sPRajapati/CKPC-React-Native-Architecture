import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '@/shared/constants';

interface LoaderProps {
  overlay?: boolean;
}

// Atom: spinner. `overlay` centers it over the screen with a scrim.
export const Loader = ({ overlay = false }: LoaderProps) => {
  if (!overlay) return <ActivityIndicator color={colors.primary} />;
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
