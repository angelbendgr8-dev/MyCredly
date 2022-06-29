import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from './BottomTabBar';
import Dashboard from '../pages/Dashboard';
import Wallet from '../pages/Wallet';
import BuyAndSell from '../pages/BuyAndSell';
import Swap from '../pages/Swap';
import Account from '../pages/Account';
import {BottomTabList} from '../utils/ParamList';

const Tab = createBottomTabNavigator<BottomTabList>();

export function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="P2P" component={BuyAndSell} />
      <Tab.Screen name="Swap" component={Swap} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
