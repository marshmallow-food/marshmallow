import {StyleSheet, Text} from 'react-native';
import React, {memo} from 'react';
import normalize from 'react-native-normalize';

export interface HeaderProps {
  title: string;
  titleStyle?: object;
}

const Header = ({title, titleStyle}: HeaderProps) => {
  return <Text style={[styles.header, titleStyle]}>{title}</Text>;
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 0,
    width: '100%',
    color: 'black',
    fontFamily: 'Comfortaa-Bold',
    fontSize: normalize(36),
  },
});

export default memo(Header);
