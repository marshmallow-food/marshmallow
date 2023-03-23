import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {SplashScreen} from '../screens/SplashScreen';
import {HomeScreen} from '../screens/Home';
import {ProductsPageOptions, ProductsScreen} from 'src/screens/Products';
import ProductInfoModal from 'src/components/ProductInfoModal';

const {Screen, Navigator} = createNativeStackNavigator<AppStackParamList>();

export type AppStackParamList = {
  splash: undefined;
  home: undefined;
  products: {subcategory: string; subcategory_id: number};
  product: {productId: number};
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
    <Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {fontFamily: 'Comfortaa-Bold', fontSize: 20},
      }}
      initialRouteName="home">
      <Screen name="splash" component={SplashScreen} />
      <Screen
        name="home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Screen
        name="products"
        component={ProductsScreen}
        options={ProductsPageOptions}
        initialParams={{subcategory: '', subcategory_id: 1}}
      />
      <Screen
        name="product"
        component={ProductInfoModal}
        options={{
          presentation: 'modal',
          gestureEnabled: true,
          headerShown: false,
        }}
        initialParams={{productId: 1}}
      />
    </Navigator>
  );
};
