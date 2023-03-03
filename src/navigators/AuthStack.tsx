import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {SplashScreen} from 'src/screens/SplashScreen';
import {WelcomeScreen} from '../screens/Welcome';
import {
  AuthenticationScreen,
  AuthenticationScreenOptions,
} from '../screens/Authentication';
import {OTPScreen, OTPScreenOptions} from '../screens/OTP';
import React from 'react';
import {RouteProp} from '@react-navigation/native';

const {Screen, Navigator} = createNativeStackNavigator<AuthStackParamList>();

export type AuthStackParamList = {
  splash: undefined;
  welcome: undefined;
  authentication: undefined;
  otp: undefined;
};

export type AuthStackNavigationProp<
  RouteName extends keyof AuthStackParamList,
> = NativeStackNavigationProp<AuthStackParamList, RouteName>;

export type AuthNavigations = {
  [RouteName in keyof AuthStackParamList]: AuthStackNavigationProp<RouteName>;
};

export type AuthStackRoutes = {
  [RouteName in keyof AuthStackParamList]: RouteProp<
    AuthStackParamList,
    RouteName
  >;
};

export const AuthStack = () => {
  return (
    <Navigator
      initialRouteName="welcome"
      screenOptions={{
        headerShown: true,
        title: '',
        headerShadowVisible: false,
      }}>
      <Screen name="splash" component={SplashScreen} />
      <Screen
        name="welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="authentication"
        component={AuthenticationScreen}
        options={AuthenticationScreenOptions}
      />
      <Screen name="otp" component={OTPScreen} options={OTPScreenOptions} />
    </Navigator>
  );
};
