import React from 'react';
import TextInputMask from 'react-native-text-input-mask';
import {KeyboardTypeOptions, StyleSheet, Text, View} from 'react-native';

interface InputAdapterProps {
  mask: string;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  onChangeText: (extracted: string | undefined) => void;
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
}: InputAdapterProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInputMask
        onChangeText={(formatted, extracted) => {
          onChangeText(extracted);
        }}
        placeholder={placeholder}
        value={value}
        style={styles.inputMask}
        mask={mask}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMask: {
    borderWidth: 2,
    borderRadius: 6,
    width: '100%',
    padding: 12,
    color: 'black',
    fontSize: 20,
  },
  label: {
    color: 'black',
    paddingBottom: 20,
    fontSize: 20,
  },
});

export default InputAdapter;
