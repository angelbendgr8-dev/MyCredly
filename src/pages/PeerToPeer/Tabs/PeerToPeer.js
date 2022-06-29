import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Buy from '../Buy';
import {PeerTabBar} from './PeerTabBar';
import Sell from '../Sell';

const Tab = createMaterialTopTabNavigator();

export function PeerToPeer() {
  return (
    <Tab.Navigator tabBar={props => <PeerTabBar {...props} />}>
      <Tab.Screen name="Buy" component={Buy} />
      <Tab.Screen name="Sell" component={Sell} />
    </Tab.Navigator>
  );
}
