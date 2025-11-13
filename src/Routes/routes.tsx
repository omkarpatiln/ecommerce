import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import CartScreen from '../Screen/CartScreen/CartScreen';
import Home from '../Screen/Home/Home';

export type StackParams = {
  CartScreen: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<StackParams>();

export type StackProps<ScreenName extends keyof StackParams> =
  NativeStackScreenProps<StackParams, ScreenName>;

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="MyTabs" component={MyTabs} /> */}
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
