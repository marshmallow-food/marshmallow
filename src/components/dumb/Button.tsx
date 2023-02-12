import React from 'react';
import {
  Text,
  TouchableHighlight,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  buttonColor?: string;
  titleColor?: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
  icon,
}: ButtonProps) => {
  return (
    <TouchableHighlight
      style={{
        ...buttonStyle,
        backgroundColor: buttonColor,
      }}
      onPress={onPress}>
      <View>
        {icon}
        {title ? (
          <Text style={{...textStyle, color: titleColor}}>{title}</Text>
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

export default Button;
