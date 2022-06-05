import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface Props extends TextInputProps {
  textBold?: boolean;
  label: string;
  changeTextEvent: (text: string) => void;
}

const CustomTextInput = ({
  textBold,
  label,
  changeTextEvent,
  style,
  ...others
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <View style={{paddingTop: 25, marginHorizontal: 24}}>
      <Text
        style={{
          position: 'absolute',
          left: 0,
          top: value.length === 0 && !isFocused ? 18 : 0,
          fontSize: value.length === 0 && !isFocused ? 16 : 12,
          color: 'gray',
        }}>
        {label}
      </Text>
      <TextInput
        style={[styles.input]}
        onChangeText={text => {
          setValue(text);
          changeTextEvent(text);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...others}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#647FFF',
  },
});
