import React from 'react';
import MaskInput, {Mask} from 'react-native-mask-input';
import {KeyboardTypeOptions, StyleSheet, Text, View} from 'react-native';
import {Themes} from 'src/theme';
import {useSelector} from 'src/hooks/useSelector';
import {themeTypeSelector} from 'src/modules/app/selectors';

interface InputAdapterProps {
  mask: Mask;
  containerStyle?: object;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  onChangeText: (extracted?: string) => void;
  value: string;
  placeholder?: string;
}

const InputAdapter = ({
  mask,
  keyboardType,
  label,
  value,
  onChangeText,
  placeholder,
  containerStyle,
}: InputAdapterProps) => {
  const theme = Themes[useSelector(themeTypeSelector)];

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <MaskInput
        onChangeText={(masked, unmasked, obfuscated) => {
          onChangeText(unmasked);
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        value={value}
        style={styles.inputMask}
        mask={mask}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  inputMask: {
    borderWidth: 0,
    borderRadius: 32,
    width: '100%',
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 22,
    backgroundColor: '#F2F2F2',
    color: '#101829',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  label: {
    color: 'black',
    paddingBottom: 20,
    fontSize: 22,
    fontFamily: 'Lato-Semibold',
  },
});

export default InputAdapter;
