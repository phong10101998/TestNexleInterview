/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {ReactNode} from 'react';
import {SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreen} from './src/Screen/SignUpScreen';
import {ChooseCategoriesScreen} from './src/Screen/ChooseCategoriesScreen';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();

const App: () => ReactNode = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="signUp"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={'signUp'} component={SignUpScreen} />
          <Stack.Screen
            name={'chooseCategory'}
            component={ChooseCategoriesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
