import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {SplashScreen} from '../screens/SplashScreen';
import {SettingsScreen} from '../screens/Settings';
import {HomeScreen} from '../screens/Home';

const {Screen, Navigator} = createNativeStackNavigator<AppStackParamList>();

export type AppStackParamList = {
  splash: undefined;
  home: undefined;
  settings: undefined;
};

export type AppStackNavigationProp<RouteName extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, RouteName>;

export type AppNavigations = {
  [RouteName in keyof AppStackParamList]: AppStackNavigationProp<RouteName>;
};

export type AppStackRoutes = {
  [RouteName in keyof AppStackParamList]: RouteProp<
    AppStackParamList,
    RouteName
  >;
};

export const AppStack = () => {
  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="home">
      <Screen name="splash" component={SplashScreen} />
      <Screen name="home" component={HomeScreen} />
      <Screen name="settings" component={SettingsScreen} />
    </Navigator>
  );
};
