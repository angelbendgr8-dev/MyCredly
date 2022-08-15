import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Fiats from '../Fiats';
import Crypto from '../Crypto';
import {WalletListTabBar} from './WalletListTabBar';

const Tab = createMaterialTopTabNavigator();

export function WalletListTab() {
  return (
    <Tab.Navigator tabBar={props => <WalletListTabBar {...props} />}>
      <Tab.Screen name="Fiat" component={Fiats} />
      <Tab.Screen name="Crypto" component={Crypto} />
    </Tab.Navigator>
  );
}
