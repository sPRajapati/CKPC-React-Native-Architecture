import type { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';

import { Loader } from '@/shared/components';

interface WithLoaderProps {
  isLoading?: boolean;
}

export const withLoader = <P extends object>(Component: ComponentType<P>) => {
  const ComponentWithLoader = ({ isLoading, ...props }: P & WithLoaderProps) => (
    <View style={styles.wrapper}>
      <Component {...(props as P)} />
      {isLoading ? <Loader overlay /> : null}
    </View>
  );

  ComponentWithLoader.displayName = `withLoader(${
    Component.displayName ?? Component.name ?? 'Component'
  })`;

  return ComponentWithLoader;
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});
