import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Virtual from './Virtual';
import Physical from './Physical';
import {CardTabBar} from './CardTabBar';

const Tab = createMaterialTopTabNavigator();

export function CardTab() {
  return (
    <Tab.Navigator tabBar={props => <CardTabBar {...props} />}>
      <Tab.Screen name="Virtual" component={Virtual} />
      <Tab.Screen name="Physical" component={Physical} />
    </Tab.Navigator>
  );
}
