import {StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {IProduct} from 'src/services/product/product';

export interface ProductCardProps {
  product: IProduct;
  tileSize: number;
  onPress: () => void;
}

const ProductCard = ({product, tileSize, onPress}: ProductCardProps) => {
  const {id, image_url, measure, name, price, size} = product;

  return (
    <TouchableOpacity
      style={[styles.container, {width: tileSize}]}
      onPress={onPress}>
      <Image
        source={{uri: image_url}}
        style={[styles.image, {width: tileSize, height: tileSize}]}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.size}>{`${size} ${measure}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    fontFamily: 'Comfortaa-SemiBold',
    color: 'black',
    fontSize: 14,
    lineHeight: 14,
    marginBottom: 8,
  },
  size: {
    fontFamily: 'Comfortaa-Bold',
    color: '#A1A1A1',
    fontSize: 14,
    lineHeight: 14,
  },
});

export default memo(ProductCard);
