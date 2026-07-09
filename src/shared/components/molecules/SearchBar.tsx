import { Search } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import { colors } from '@/shared/constants';
import { Icon } from '../atoms/Icon';
import { Input } from '../atoms/Input';

// Molecule: search icon + input, composed from atoms.
export const SearchBar = (props: TextInputProps) => (
  <View style={styles.row}>
    <Icon icon={Search} size={18} color={colors.muted} />
    <Input style={styles.input} placeholder="Search…" {...props} />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  input: { flex: 1, borderWidth: 0, paddingHorizontal: 0 },
});
