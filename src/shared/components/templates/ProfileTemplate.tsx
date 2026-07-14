import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen, ProfileHeader, ProfileStats } from '@/shared/components';

interface ProfileTemplateProps {
  name: string;
  email?: string | undefined;
  avatar?: string | undefined;
  stats: { label: string; value: number | string }[];
  children?: ReactNode;
}

export const ProfileTemplate = ({
  name,
  email,
  avatar,
  stats,
  children,
}: ProfileTemplateProps) => (
  <Screen>
    <View style={styles.container}>
      <ProfileHeader name={name} email={email} avatar={avatar} />
      <ProfileStats stats={stats} />
      {children}
    </View>
  </Screen>
);

const styles = StyleSheet.create({
  container: { gap: 20 },
});
