import {StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {IProduct} from 'src/services/product/product';
import Button from 'src/components/dumb/Button';
import {useSelector} from 'src/hooks/useSelector';
import {themeSelector} from 'src/modules/app/selectors';
import Plus from 'src/components/icons/Plus';

export interface ProductCardProps {
  product: IProduct;
  tileSize: number;
  onPress: () => void;
}

const ProductCard = ({product, tileSize, onPress}: ProductCardProps) => {
  const {id, image_url, measure, name, price, size} = product;
  const theme = useSelector(themeSelector);

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
      <Button
        title={product.price}
        titleStyle={{
          color: theme.colors.textPrimary,
          fontFamily: 'Comfortaa-Bold',
          fontSize: 14,
        }}
        buttonStyle={{
          backgroundColor: theme.colors.inputGray,
          borderRadius: 30,
          paddingHorizontal: 13,
          paddingVertical: 8,
        }}
        underlayColor={theme.colors.white}
        onPress={() => console.log('df')}
        icon={<Plus />}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
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
    marginBottom: 5,
  },
});

export default memo(ProductCard);
