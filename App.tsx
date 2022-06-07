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
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './src/store';
import {getOAuthToken} from './src/service/handleToken';

const Stack = createNativeStackNavigator();

const App: () => ReactNode = () => {
  // const getToken = async () => {
  //   return await getOAuthToken();
  // };
  // console.log(getToken()); //{"_U": 0, "_V": 0, "_W": null, "_X": null}

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'signUp'}
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
      </PersistGate>
    </Provider>
  );
};

export default App;
