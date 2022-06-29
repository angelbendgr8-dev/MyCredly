import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Fund from '../Fund';
import Transactions from '../Transactions';
import {FundTabBar} from './FundTabBar';

const Tab = createMaterialTopTabNavigator();

export function FundTab() {
  return (
    <Tab.Navigator tabBar={props => <FundTabBar {...props} />}>
      <Tab.Screen name="Fund" component={Fund} />
      <Tab.Screen name="Transactions" component={Transactions} />
    </Tab.Navigator>
  );
}
