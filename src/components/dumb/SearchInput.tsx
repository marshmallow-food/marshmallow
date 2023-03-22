import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

interface SearchInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
}

const SearchInput = ({placeholder, onChangeText, value}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Icon name="search" size={25} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        scrollEnabled={false}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && (
        <Icon
          name="close-o"
          size={25}
          style={styles.icon}
          onPress={() => onChangeText('')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 30,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 11,
    fontFamily: 'Comfortaa-Regular',
  },
  icon: {
    marginHorizontal: 5,
    color: 'black',
  },
});

export default SearchInput;
