import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Initial from './src/screens/initial';
import List from './src/screens/list';
import Item from './src/screens/item';

const AppNavigator = createStackNavigator({
    Init: {screen: Initial},
    List: {screen: List},
    Item: {screen: Item},
});

export default createAppContainer(AppNavigator);