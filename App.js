import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Initial from './src/screens/initial';
import List from './src/screens/list';
import Item from './src/screens/item';

const AppStack = createStackNavigator({ List: List, Item: Item });
const AuthStack = createStackNavigator({ SignIn: Initial });

export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Auth',
    }
));
