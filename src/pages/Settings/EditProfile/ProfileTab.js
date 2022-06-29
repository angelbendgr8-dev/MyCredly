import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ProfileTabBar} from './ProfileTabBar';
import Security from './Security';
import Personal from './Personal';

const Tab = createMaterialTopTabNavigator();

export function ProfileTab() {
  return (
    <Tab.Navigator tabBar={props => <ProfileTabBar {...props} />}>
      <Tab.Screen name="Personal" component={Personal} />
      <Tab.Screen name="Security" component={Security} />
    </Tab.Navigator>
  );
}
