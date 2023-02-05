import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-easy-icon';
import {AppStackParamList} from './AppStack';
import {HomePage} from '../screens/Home';
import {SettingsPage} from '../screens/Settings';
import {useTheme} from 'styled-components';


const {Navigator, Screen} = createBottomTabNavigator<MainBottomTabParamList>();

export type MainBottomTabParamList = {
  home: undefined;
  settings: undefined;
};

export type MainBottomTabNavigationProp<
  RouteName extends keyof MainBottomTabParamList,
> = CompositeNavigationProp<
  BottomTabNavigationProp<MainBottomTabParamList, RouteName>,
  NativeStackNavigationProp<AppStackParamList>
>;

export type MainBottomTabNavigations = {
  [RouteName in keyof MainBottomTabParamList]: MainBottomTabNavigationProp<RouteName>;
};

export type MainBottomTabRoutes = {
  [RouteName in keyof MainBottomTabParamList]: RouteProp<
    MainBottomTabParamList,
    RouteName
  >;
};

export const MainBottomTab = () => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.background,
        },
      }}>
      <Screen
        name="home"
        component={HomePage}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({color, size}) => (
            <Icon type="material" name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="settings"
        component={SettingsPage}
        options={{
          tabBarLabel: t('settings'),
          tabBarIcon: ({color, size}) => (
            <Icon type="material" name="settings" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
