import { View, Text } from 'react-native'
import React from 'react'
import MyTabs from './src/Routes/BottomTabs'
import Routes from './src/Routes/routes'
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './src/redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthNavigator from './src/Routes/AuthNavigator';
import RootNavigator from './src/Routes/RootNavigator';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootNavigator />
    </SafeAreaView>
  );
};

export default App