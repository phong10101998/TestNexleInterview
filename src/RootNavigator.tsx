import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUpScreen } from './Screen/SignUpScreen';
import { ChooseCategoriesScreen } from './Screen/ChooseCategoriesScreen';

const RootStack = createStackNavigator();

export const RootStackNavigator = () => (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={'signUp'} component={SignUpScreen} />
        <RootStack.Screen name={'chooseCategories'} component={ChooseCategoriesScreen} />
    </RootStack.Navigator>
);
