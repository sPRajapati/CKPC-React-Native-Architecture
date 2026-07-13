import { Image, StyleSheet, View } from 'react-native';
import { colors } from '@/shared/constants';
import type { Product } from '@/shared/types';
import { Text } from '../atoms/Text';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => (
  <View style={styles.container}>
    {product.imageUrl ? (
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
    ) : null}
    <View style={styles.copy}>
      <Text variant="label">{product.name}</Text>
      {product.description ? (
        <Text variant="caption" numberOfLines={2}>
          {product.description}
        </Text>
      ) : null}
      <Text variant="label">${product.price.toFixed(2)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  image: { aspectRatio: 16 / 9, width: '100%' },
  copy: { gap: 6, padding: 12 },
});
