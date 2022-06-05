import React, {useState} from 'react';
import {
  Image,
  Pressable,
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

const CustomTextInputPassword = ({
  textBold,
  label,
  changeTextEvent,
  style,
  ...others
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const [levelPass, setLevelPass] = useState('');
  const [color, setColor] = useState('transparent');
  const [widthBottomLine, setWidthBottomLine] = useState('0%');
  const [hide, setHide] = useState(true);

  const isUpperCase = text => !!/[A-Z]/.exec(text[0]);

  const handleLevelPass = (pass: string) => {
    var hasNumber = /\d/;

    if (pass.length === 0) {
      setWidthBottomLine('0%');
      setLevelPass('');
    } else {
      if (pass.length < 5) {
        setLevelPass('Too short');
        setColor('gray');
      } else {
        if (pass.length < 8) {
          setLevelPass('Week');
          setColor('red');
          setWidthBottomLine('25%');
        } else {
          if (pass.length < 10) {
            setLevelPass('Fair');
            setColor('yellow');
            setWidthBottomLine('50%');
          } else {
            if (isUpperCase(pass) && !hasNumber.test(pass)) {
              setLevelPass('Good');
              setColor('blue');
              setWidthBottomLine('75%');
            }
            if (isUpperCase(pass) && hasNumber.test(pass)) {
              setLevelPass('Strong');
              setColor('green');
              setWidthBottomLine('100%');
            }
          }
        }
      }
    }
  };

  return (
    <View style={{paddingTop: 25, marginHorizontal: 24, marginTop: 25}}>
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
      <View style={{flexDirection: 'row', flex: 1}}>
        <TextInput
          secureTextEntry={hide}
          style={[styles.input]}
          onChangeText={text => {
            setValue(text);
            handleLevelPass(text);
            changeTextEvent(text);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...others}
        />
        <Pressable
          style={{alignSelf: 'center'}}
          onPress={() => {
            setHide(!hide);
          }}>
          <Image
            resizeMode="contain"
            style={styles.hideImage}
            source={require('../asset/ic_hide.png')}
          />
        </Pressable>
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: value.length === 0 ? '#647FFF' : 'gray',
        }}>
        <View
          style={{
            backgroundColor: color,
            width: widthBottomLine,
            height: '100%',
          }}
        />
      </View>
      <Text
        style={{
          color: color,
          fontSize: 14,
          alignSelf: 'flex-end',
          marginTop: 10,
        }}>
        {levelPass}
      </Text>
    </View>
  );
};

export default CustomTextInputPassword;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    paddingBottom: 10,
    width: '90%',
  },
  hideImage: {width: 23, height: 12, marginLeft: 5, marginBottom: 10},
});
