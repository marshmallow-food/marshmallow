import React from 'react';
import MaskInput, {Mask} from 'react-native-mask-input';
import {KeyboardTypeOptions, StyleSheet, Text, View} from 'react-native';
import {Themes} from 'src/theme';
import {useSelector} from 'src/hooks/useSelector';
import {themeTypeSelector} from 'src/modules/app/selectors';
import normalize from 'react-native-normalize';
import {FieldError} from 'react-hook-form';

interface InputAdapterProps {
  mask: Mask;
  containerStyle?: object;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  onBlur: () => void;
  onChangeText: (extracted?: string) => void;
  value: string;
  placeholder?: string;
  onFocus?: () => void;
  error?: FieldError | undefined;
}

const InputAdapter = ({
  mask,
  keyboardType,
  label,
  value,
  onChangeText,
  placeholder,
  containerStyle,
  onBlur,
  onFocus,
  error,
}: InputAdapterProps) => {
  const theme = Themes[useSelector(themeTypeSelector)];

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <MaskInput
        onChangeText={(masked, unmasked) => {
          onChangeText(unmasked);
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        value={value}
        style={[
          styles.inputMask,
          error && {borderWidth: 1, borderColor: theme.colors.error},
        ]}
        mask={mask}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.errorMessage}>{error.message}</Text>}
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
    borderWidth: 1,
    borderColor: '#F2F2F2',
    margin: 0,
    borderRadius: normalize(30),
    width: '100%',
    paddingTop: normalize(13),
    paddingBottom: normalize(13),
    paddingLeft: normalize(22),
    backgroundColor: '#F2F2F2',
    color: '#101829',
    fontSize: normalize(16),
    fontFamily: 'Comfortaa-Regular',
  },
  errorMessage: {
    fontSize: normalize(16),
    fontFamily: 'Comfortaa-Regular',
    color: '#C51C07',
  },
  label: {
    color: 'black',
    paddingBottom: normalize(12),
    fontSize: normalize(16),
    fontFamily: 'Comfortaa-Regular',
  },
});

export default InputAdapter;
