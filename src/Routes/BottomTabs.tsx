import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../Screen/Profile';
import React from 'react';
import Home from '../Screen/Home/Home';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen options={{}} name="Home" component={Home} />

      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
export default MyTabs;
