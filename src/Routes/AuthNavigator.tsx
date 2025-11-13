import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginScreen from '../Screen/AuthScreen/LoginScreen';
import SignupScreen from '../Screen/AuthScreen/SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../Screen/SplashScreen';


export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  SplashScreen:undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();
export type StackAuthProps<ScreenName extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, ScreenName>;

const AuthNavigator = () => {
  return (
  <Stack.Navigator initialRouteName='SplashScreen'  screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SplashScreen" component={SplashScreen}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  
  );
};

export default AuthNavigator;
