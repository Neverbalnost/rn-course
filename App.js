import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Initial from './src/screens/initial';
import List from './src/screens/list';
import Cart from './src/screens/cart';
import Item from './src/screens/item';
import Map from './src/screens/map';

import { Sentry } from 'react-native-sentry';

Sentry.config('https://66bc6fac702c4083961626a77d5321f4@sentry.io/1394239').install();


const AppStack = createStackNavigator({ List: List, Item: Item, Map: Map, Cart: Cart });
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
