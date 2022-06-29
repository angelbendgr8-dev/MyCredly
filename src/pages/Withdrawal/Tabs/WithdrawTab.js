import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {WithdrawTabBar} from './WithdrawTabBar';
import WithdrawalHistory from '../WithdrawalHistory';
import Withdraw from '../Withdraw';

const Tab = createMaterialTopTabNavigator();

export function WithdrawTab() {
  return (
    <Tab.Navigator tabBar={props => <WithdrawTabBar {...props} />}>
      <Tab.Screen name="Withdraw" component={Withdraw} />
      <Tab.Screen name="History" component={WithdrawalHistory} />
    </Tab.Navigator>
  );
}
