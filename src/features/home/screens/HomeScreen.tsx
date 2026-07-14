import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Screen, Button } from '@/shared/components';
import { colors, rpx } from '@/shared/constants';
import { withLoader } from '@/shared/hoc';
import { useHomeViewModel } from '../hooks';

type HomeViewModel = ReturnType<typeof useHomeViewModel>;

interface HomeContentProps {
  vm: HomeViewModel;
}

const HomeContent = ({ vm }: HomeContentProps) => (
  <Screen>
    <Text style={styles.title}>{vm.t('home.title')}</Text>
    <FlatList
      data={vm.data ?? []}
      keyExtractor={(item) => item.id}
      onRefresh={vm.refetch}
      refreshing={vm.isRefetching}
      ListEmptyComponent={<Text style={styles.empty}>{vm.t('home.empty')}</Text>}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
        </View>
      )}
    />
    <Button title="Log out" onPress={vm.logout} />
  </Screen>
);

const HomeContentWithLoader = withLoader(HomeContent);

export const HomeScreen = () => {
  const vm = useHomeViewModel();
  return (
    <HomeContentWithLoader vm={vm} isLoading={vm.isLoading} />
  );
};

const styles = StyleSheet.create({
  title: { fontSize: rpx(28), fontWeight: '700', marginBottom: rpx(16), color: colors.text },
  empty: { color: colors.muted, textAlign: 'center', marginTop: rpx(40) },
  row: { paddingVertical: rpx(12), borderBottomWidth: 1, borderBottomColor: colors.border },
  rowTitle: { fontSize: rpx(16), fontWeight: '600', color: colors.text },
  rowSubtitle: { color: colors.muted, marginTop: rpx(2) },
});
