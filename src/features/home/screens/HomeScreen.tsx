import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen, Button } from '@/shared/components';
import { colors } from '@/shared/constants';
import { useAppDispatch } from '@/store/hooks';
import { logoutThunk } from '@/features/auth';
import { useHomeData } from '../hooks';

export const HomeScreen = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data, isLoading, refetch, isRefetching } = useHomeData();

  return (
    <Screen>
      <Text style={styles.title}>{t('home.title')}</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data ?? []}
          keyExtractor={(item) => item.id}
          onRefresh={refetch}
          refreshing={isRefetching}
          ListEmptyComponent={<Text style={styles.empty}>{t('home.empty')}</Text>}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
            </View>
          )}
        />
      )}
      <Button title="Log out" onPress={() => dispatch(logoutThunk())} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16, color: colors.text },
  empty: { color: colors.muted, textAlign: 'center', marginTop: 40 },
  row: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  rowSubtitle: { color: colors.muted, marginTop: 2 },
});
