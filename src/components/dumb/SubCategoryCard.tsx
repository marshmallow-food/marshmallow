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
}

const SubCategoryCard = ({title, img, onPress}: SubCategoryCardProps) => {
  return (
    <TouchableOpacity style={styles.tileContainer} onPress={onPress}>
      <ImageBackground
        source={img}
        resizeMode="cover"
        style={styles.image}
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
    flex: 1 / 3,
    height: 150,
    borderRadius: 10,
    position: 'relative',
  },
  image: {
    flex: 1,
    borderRadius: 10,
    height: 150,
    width: '100%',
    position: 'absolute',
  },
});

export default memo(SubCategoryCard);
