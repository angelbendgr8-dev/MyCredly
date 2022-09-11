import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {WithdrawTabBar} from './WithdrawTabBar';
import CWithdraw from '../CWithdraw';
import CWithdrawalHistory from '../CWithdrawalHistory';

const Tab = createMaterialTopTabNavigator();

export function CWithdrawTab() {
  return (
    <Tab.Navigator tabBar={props => <WithdrawTabBar {...props} />}>
      <Tab.Screen name="Withdraw" component={CWithdraw} />
      <Tab.Screen name="History" component={CWithdrawalHistory} />
    </Tab.Navigator>
  );
}
