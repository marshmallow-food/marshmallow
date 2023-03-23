import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
} from 'react-native';
import React, {memo} from 'react';

export interface SubCategoryCardProps {
  title: string;
  img: {uri: string};
  onPress: () => void;
  tileSize: number;
}

const SubCategoryCard = ({
  title,
  img,
  onPress,
  tileSize,
}: SubCategoryCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.tileContainer, {width: tileSize, height: 150}]}
      onPress={onPress}>
      <ImageBackground
        source={img}
        resizeMode="cover"
        style={[styles.image, {width: tileSize, height: 150}]}
        imageStyle={{
          borderRadius: 10,
        }}></ImageBackground>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 10,
          height: 150,
        }}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Comfortaa-Bold',
    color: 'white',
    fontSize: 12,
  },
  tileContainer: {
    borderRadius: 10,
    position: 'relative',
  },
  image: {
    flex: 1,
    borderRadius: 10,
    position: 'absolute',
  },
});

export default memo(SubCategoryCard);
