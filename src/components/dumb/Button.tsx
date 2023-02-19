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
  underlayColor?: string;
}

const Button = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
  icon,
  underlayColor,
}: ButtonProps) => {
  return (
    <TouchableHighlight
      style={{
        ...buttonStyle,
        backgroundColor: buttonColor,
      }}
      underlayColor={underlayColor}
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
