import React, {memo, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import CustomTextInput from '../component/CustomInputText';
import CustomTextInputPassword from '../component/CustomInputTextPassword';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUser, UserState} from '../store/signup';
import {setOAuthToken} from '../service/handleToken';

export const SignUpScreen = memo(({navigation}: any) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state: {user: UserState}) => state.user);

  const {userItem, status}: any = userStore;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [canSignUp, setCanSignUp] = useState(false);

  const checkSignUpUser = (email: string, password: string) => {
    dispatch(signUpUser({email, password}));
  };

  useEffect(() => {
    if (email.length !== 0 && password.length !== 0) {
      setCanSignUp(true);
    } else {
      setCanSignUp(false);
    }
  }, [email, password]);

  useEffect(() => {
    if (userItem.token !== undefined) {
      setOAuthToken(userItem.token);
      navigation.navigate('chooseCategory');
    }
  }, [userItem]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../asset/bg_sign_up.png')}
        resizeMode="stretch"
        style={styles.imageBackground}
      />
      <LinearGradient
        colors={['transparent', 'black', 'black']}
        style={styles.linearGradient}>
        <Image
          source={require('../asset/ic_arrow.png')}
          resizeMode="center"
          style={styles.imageBack}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}>
          <Text style={styles.textStarted}>Let’s get you started!</Text>

          <CustomTextInput
            label={'Your Email'}
            changeTextEvent={text => {
              setEmail(text);
            }}
          />
          <CustomTextInputPassword
            label={'Your Password'}
            changeTextEvent={text => {
              setPassword(text);
            }}
            maxLength={28}
          />
          <View style={styles.viewCheckbox}>
            {/* <CheckBox
                            disabled={false}
                            value={isChecked}
                            onValueChange={(newValue) => setIsChecked(newValue)}
                        /> */}
            <Text style={{color: 'white', fontSize: 14}}>
              I am over 16 years of age
            </Text>
          </View>

          <Text style={styles.textPolicy}>
            By clicking Sign Up, you are indicating that you have read and agree
            to the
            <Text style={{color: '#647FFF'}}> Terms of Service </Text>
            and
            <Text style={{color: '#647FFF'}}> Privacy Policy </Text>
          </Text>
          <View
            style={{
              marginTop: 30,
              marginHorizontal: 24,
              marginBottom: 60,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.textSignUp}>Sign Up</Text>
            <Pressable
              onPress={() => {
                checkSignUpUser(email, password);
                // checkData();
                // navigation.navigate('chooseCategory');
              }}
              disabled={!canSignUp}
              style={[
                styles.nextBtn,
                {
                  borderColor: canSignUp
                    ? '#647FFF'
                    : 'rgba(255, 255, 255, 0.5)',
                },
              ]}>
              <Image
                style={{
                  width: 23,
                  height: 52,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                resizeMode="contain"
                source={require('../asset/ic_next.png')}
              />
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row'},
  imageBack: {
    width: 10,
    height: 17,
    marginTop: 30,
    marginLeft: 24,
    top: 0,
    left: 0,
    position: 'absolute',
  },
  imageBackground: {
    width: '100%',
    height: '70%',
  },
  textStarted: {
    marginTop: '70%',
    marginStart: 24,
    color: 'white',
    fontSize: 22,
    marginBottom: 30,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  viewCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 52,
  },
  textPolicy: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    marginHorizontal: 24,
    marginTop: 29,
  },
  textSignUp: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
  nextBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
  },
});
