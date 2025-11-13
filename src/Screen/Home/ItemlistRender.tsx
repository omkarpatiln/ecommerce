import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Product } from './HomeInterface';
import { colors, fontWeights, sizes, textStyles } from '../../theme/themStyles';

interface Props {
  item: Product;
  onAddCart: (count: number) => void;
  onLessCart: (count: number) => void;
  onRemoveCart: () => Promise<boolean>;
}

const ItemListRender: React.FC<Props> = ({
  item,
  onAddCart,
  onLessCart,
  onRemoveCart,
}) => {
  const [count, setCount] = useState(item.cartCount ?? 0);

  const handleAdd = () => {
    const newCount = count + 1;
    setCount(newCount);
    onAddCart(newCount);
  };

  const handleLess = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      onLessCart(newCount);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.productImage} />

      <Text numberOfLines={1} style={styles.category}>
        {item.category}
      </Text>

      <Text numberOfLines={3} style={styles.description}>
        {`Description: ${item.description}`}
      </Text>

      <Text style={styles.price}>₹ {item.price}</Text>

      <View style={styles.actionRow}>
        {count === 0 ? (
          <TouchableOpacity style={styles.addToCartBtn} onPress={handleAdd}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.counterRow}>
            <TouchableOpacity onPress={handleLess} style={styles.circleBtn}>
              <Text style={styles.plusMinus}>-</Text>
            </TouchableOpacity>

            <Text style={styles.countText}>{item.cartCount}</Text>

            <TouchableOpacity onPress={handleAdd} style={styles.circleBtn}>
              <Text style={styles.plusMinus}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.removeBtn}
          onPress={async () => {
            const res = await onRemoveCart();
            if (res) {
              setCount(0);
            }
          }}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemListRender;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: sizes.paddingM,
    margin: sizes.marginM,
    borderRadius: sizes.Radius,
    elevation: 5,
  },

  productImage: {
    width: sizes.Width * 0.35,
    height: sizes.Height * 0.18,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  category: {
    ...textStyles.heading,
    fontSize: sizes.fontM,
    color: colors.black,
    marginTop: sizes.marginS,
  },

  description: {
    ...textStyles.body,
    color: colors.textDark,
    marginTop: sizes.marginXS,
  },

  price: {
    ...textStyles.heading,
    fontSize: sizes.fontM,
    color: colors.primary,
    marginTop: sizes.marginS,
  },

  actionRow: {
    flexDirection: 'row',
    marginTop: sizes.marginM,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addToCartBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: sizes.paddingS,
    borderRadius: sizes.Radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  addToCartText: {
    color: colors.white,
    fontWeight: fontWeights.bold,
    fontSize: sizes.fontM,
  },

  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },

  circleBtn: {
    height: sizes.iconL + 8,
    width: sizes.iconL + 8,
    borderRadius: (sizes.iconL + 8) / 2,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  plusMinus: {
    fontSize: sizes.fontXL,
    fontWeight: fontWeights.bold,
    color: colors.black,
  },

  countText: {
    ...textStyles.heading,
    fontSize: sizes.fontL,
    color: colors.black,
    marginHorizontal: 12,
  },

  removeBtn: {
    backgroundColor: colors.red,
    paddingVertical: sizes.paddingS,
    paddingHorizontal: sizes.paddingM,
    borderRadius: sizes.Radius,
  },

  removeText: {
    color: colors.white,
    fontWeight: fontWeights.bold,
    fontSize: sizes.fontM,
  },
});
