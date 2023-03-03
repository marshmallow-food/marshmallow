import React from 'react';
import {
  Text,
  TouchableHighlight,
  ViewStyle,
  View,
  StyleSheet,
} from 'react-native';

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  disabledButtonStyle?: object;
  disabledTitleStyle?: object;
  titleStyle?: object;
  buttonStyle?: ViewStyle;
  icon?: React.ReactNode;
  underlayColor?: string;
  disabled?: boolean;
  dropShadow?: object;
}

const Button = ({
  title,
  onPress,
  buttonStyle,
  disabledButtonStyle,
  titleStyle,
  disabledTitleStyle,
  icon,
  underlayColor,
  disabled,
}: ButtonProps) => {
  const dynamicButtonStyle = disabled
    ? [styles.button, buttonStyle, disabledButtonStyle]
    : [styles.button, buttonStyle];
  const dynamicTitleStyle = disabled
    ? [styles.title, titleStyle, disabledTitleStyle]
    : [styles.title, titleStyle];
  return (
    <TouchableHighlight
      style={dynamicButtonStyle}
      underlayColor={underlayColor}
      onPress={onPress}
      disabled={disabled}>
      <View>
        {icon}
        {title ? <Text style={dynamicTitleStyle}>{title}</Text> : null}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 20,
  },
});

export default Button;
