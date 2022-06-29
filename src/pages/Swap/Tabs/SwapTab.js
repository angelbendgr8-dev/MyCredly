import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Swap from '../Swap';
import History from '../History';
import {SwapTabBar} from './SwapTabBar';

const Tab = createMaterialTopTabNavigator();

export function SwapTab() {
  return (
    <Tab.Navigator tabBar={props => <SwapTabBar {...props} />}>
      <Tab.Screen name="Swap Funds" component={Swap} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}
