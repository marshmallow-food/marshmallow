import React from 'react';
import {Text, TouchableOpacity, ViewStyle, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientButtonProps {
  title?: string;
  onPress?: () => void;
  disabledButtonStyle?: object;
  disabledTitleStyle?: object;
  titleStyle?: object;
  buttonStyle?: ViewStyle;
  icon?: React.ReactNode;
  disabled?: boolean;
  colors: string[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  disabledStyle?: object;
  disabledColors: string[];
}

const GradientButton = ({
  title,
  onPress,
  buttonStyle,
  disabledButtonStyle,
  titleStyle,
  disabledTitleStyle,
  disabledStyle,
  disabledColors,
  icon,
  disabled,
  colors,
  start,
  end,
}: GradientButtonProps) => {
  const dynamicButtonStyle = disabled
    ? [styles.button, buttonStyle, disabledButtonStyle]
    : [styles.button, buttonStyle];
  const dynamicTitleStyle = disabled
    ? [styles.title, titleStyle, disabledTitleStyle]
    : [styles.title, titleStyle];
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{width: '100%'}}>
      <LinearGradient
        colors={disabled ? disabledColors : colors}
        start={start}
        end={end}
        style={[
          styles.button,
          disabled ? styles.disabledButton : null,
          dynamicButtonStyle,
          disabled ? disabledStyle : null,
        ]}>
        {icon}
        {title ? <Text style={dynamicTitleStyle}>{title}</Text> : null}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    color: '#FFFFFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  title: {
    fontSize: 20,
  },
});

export default GradientButton;
